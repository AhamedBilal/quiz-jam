const db = require("../models");
const User = db.User;
const UserRelationship = db.UserRelationship;
const Op = db.Sequelize.Op;
const config = require('./../config/general.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailHandler = require('../utils/MailHandler');

// user
exports.register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        if (!(email && password && name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({where: {email: email}});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password + config.SECRET, config.SALT_ROUNDS);

        const user = await User.create({
            ...req.body,
            password: encryptedPassword,
        });

        const token = jwt.sign({userId: user._id, email}, config.SECRET, {expiresIn: "30d"});
        console.log(user.toJSON())
        user.token = token;

        await mailHandler.sendHtmlEmail(
            email,
            'Quiz Jam Account Verification',
            `<h1>Quiz Jam Account Verification</h1> <a href=${'http://localhost:3000/api/v1/users/verify?token=' + token}>Verfy your account</a>`
        )

        res.status(201).json({
            message: 'User account created successfully',
            token
        });
    } catch (err) {
        next(err);
    }
};
exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({where: {email: email}});

        if (user && (await bcrypt.compare(password + config.SECRET, user.password))) {
            const token = jwt.sign(
                {id: user.id, email},
                config.SECRET,
                {
                    expiresIn: "30d",
                }
            );

            res.status(200).json({
                id: user.id,
                token: token
            });
            return;
        }
        res.status(400).send("Invalid Credentials");
    } catch (e) {
        next(e);
    }
};
exports.findAll = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const users = await User.findAndCountAll({
            attributes: {exclude: ['password']},
            ...pagination
        });
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
};
exports.findByPk = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']}
        });
        if (!user) {
            res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
exports.findByToken = async (req, res, next) => {
    try {
        if (!req?.user?.id) {
            res.status(403).send('Invalid Token');
            return;
        }

        const user = await User.findByPk(req.user.id, {
            attributes: {exclude: ['password']}
        });
        if (!user) {
            res.status(403).send('User not found');
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
exports.update = async (req, res, next) => {
    try {
        const id = req.body.id;

        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']}
        });
        if (!user) {
            res.status(404).send('User not found');
        }
        await user.set({...req.body});
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
exports.delete = async (req, res, next) => {
    try {
        const data = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!data) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json({message: 'Deleted'});
    } catch (e) {
        next(e)
    }
};

// email
exports.forgotPassword = async (req, res, next) => {
    try {
        const {email} = req.body;
        if (!email) {
            res.status(400).send('Missing fields');
            return;
        }
        let user = await User.findOne({where: {email: email}});
        if (user) {
            mailHandler.sendHtmlEmail(
                email,
                'Quiz Jam Reset Password',
                `<h1>Quiz Jam Reset Password</h1> <a href="${'http://localhost:3000/auth/reset-password'}">Reset Password</a>`
            )
        }
        user.verifyed = true;
        await user.save();
        res.redirect('https:/localhost:4300/');
    } catch (e) {
        next(e);
    }
}
exports.verify = async (req, res, next) => {
    try {
        if (!req?.user?.id) {
            res.status(401).send('Invalid Token');
            return;
        }
        let user = await User.findByPk(req.user.id);
        user.verifyed = true;
        await user.save();
        res.redirect('https:/localhost:4300/');
    } catch (e) {
        next(e);
    }
}
exports.resetPassword = async (req, res, next) => {
    try {
        if (!req?.user?.id) {
            res.status(401).send('Invalid Token');
            return;
        }
        const {password} = req.body;
        let user = await User.findByPk(req.user.id);

        if (!(user && password)) {
            res.status(400).send("Error occurred");
            return;
        }

        user.password = await bcrypt.hash(password + config.SECRET, config.SALT_ROUNDS);
        await user.save();
        res.status(200).send("Successful");
    } catch (e) {
        next(e)
    }
}
exports.changePassword = async (req, res, next) => {
    try {
        const {oldPassword, newPassword, id} = req.body;
        let user = await User.findByPk(id);

        if (!(oldPassword && newPassword && id)) {
            res.status(400).send("Missing fields");
            return;
        }

        if (!await bcrypt.compare(oldPassword + config.SECRET, user.password)) {
            res.status(400).send("Invalid credentials");
            return;
        }
        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        user.password = await bcrypt.hash(newPassword + config.SECRET, config.SALT_ROUNDS);
        await user.save();
        res.status(200).send("Successful");
    } catch (e) {
        next(e)
    }
}

// friends
exports.friendRequest = async (req, res, next) => {
    try {

        const {userFirstId, userSecondId, type} = req.body;

        if (!(userFirstId && userSecondId && type)) {
            res.status(400).send("Invalid Request");
        }
        if (userFirstId === userSecondId) {
            res.status(400).send("Invalid Request");
        }

        const relation = await UserRelationship.findOne({
            where: {
                userFirstId: {[Op.or]: [userFirstId, userSecondId]},
                userSecondId: {[Op.or]: [userFirstId, userSecondId]}
            }
        });

        if (type === 'request') {

            if (relation) {
                res.status(200).send("Already exist");
                return;
            }

            await UserRelationship.create({
                userFirstId: userFirstId,
                userSecondId: userSecondId,
                status: 'pending'
            });

            res.status(200).send("Request Sent");

        } else {

            if (!relation) {
                res.status(500).send("Relation not found");
                return;
            }

            if (type === 'delete') {
                await relation.destroy();
                res.status(200).send("Request deleted");
                return;
            }

            relation.status = type;
            await relation.save();
            res.status(200).send("Request " + type);
        }

    } catch (e) {
        next(e)
    }
};
exports.findAllFriendRequest = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const users = await UserRelationship.findAndCountAll({
            ...pagination,
            include: User
        });
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
};
exports.findAllFriendRequestById = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const users = await UserRelationship.findAndCountAll({
            where: {
                userSecondId: req.params.id,
                status: 'pending'
            },
            ...pagination,
            include: User
        });
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}
exports.findAllFriendsById = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const users = await UserRelationship.findAndCountAll({
            where: {
                status: 'confirm',
                [Op.or]: [{
                    userFirstId: req.params.id,
                    userSecondId: req.params.id
                }]
            },
            ...pagination,
            include: User
        });
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

