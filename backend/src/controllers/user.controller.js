const db = require("../models");
const User = db.User;
const UserRelationship = db.UserRelationship;
const Op = db.Sequelize.Op;
const config = require('./../config/general.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailHandler = require('../utils/MailHandler');


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





