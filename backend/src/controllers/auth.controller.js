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
            res.status(400).json({message: "All input is required"});
        }

        const oldUser = await User.findOne({where: {email: email}});

        if (oldUser) {
            return res.status(409).json({message: "User Already Exist. Please Login"});
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
            res.status(400).json({message: "All input is required"});
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
        res.status(400).json({message: "Invalid Credentials"});
    } catch (e) {
        next(e);
    }
};
exports.findByToken = async (req, res, next) => {
    try {
        if (!req?.user?.id) {
            res.status(403).json({message: 'Invalid Token'});
            return;
        }

        const user = await User.findByPk(req.user.id, {
            attributes: {exclude: ['password']}
        });
        if (!user) {
            res.status(403).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// email
exports.forgotPassword = async (req, res, next) => {
    try {
        const {email} = req.body;
        if (!email) {
            res.status(400).json({message: 'Missing fields'});
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
            res.status(401).json({message: 'Invalid Token'});
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
            res.status(401).json({message: 'Invalid Token'});
            return;
        }
        const {password} = req.body;
        let user = await User.findByPk(req.user.id);

        if (!(user && password)) {
            res.status(400).json({message: "Error occurred"});
            return;
        }

        user.password = await bcrypt.hash(password + config.SECRET, config.SALT_ROUNDS);
        await user.save();
        res.status(200).json({message: "Successful"});
    } catch (e) {
        next(e)
    }
}
exports.changePassword = async (req, res, next) => {
    try {
        const {oldPassword, newPassword, id} = req.body;
        let user = await User.findByPk(id);

        if (!(oldPassword && newPassword && id)) {
            res.status(400).json({message: "Missing fields"});
            return;
        }

        if (!await bcrypt.compare(oldPassword + config.SECRET, user.password)) {
            res.status(400).json({message: "Invalid credentials"});
            return;
        }
        if (!user) {
            res.status(404).json({message: "User not found"});
            return;
        }

        user.password = await bcrypt.hash(newPassword + config.SECRET, config.SALT_ROUNDS);
        await user.save();
        res.status(200).json({message: "Successful"});
    } catch (e) {
        next(e)
    }
}