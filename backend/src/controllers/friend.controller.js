const db = require("../models");
const User = db.User;
const UserRelationship = db.UserRelationship;
const Op = db.Sequelize.Op;


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
};

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
};