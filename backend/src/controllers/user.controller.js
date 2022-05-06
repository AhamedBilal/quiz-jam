const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const config = require('./../config/general.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
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
            name,
            email,
            password: encryptedPassword,
        });

        const token = jwt.sign({user_id: user._id, email}, config.SECRET, {expiresIn: "30d"});
        user.token = token;

        res.status(201).json({
            success: true,
            message: 'User account created successfully',
            token
        });
    } catch (err) {
        console.log(err);
    }
};
exports.login = (req, res) => {

};
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (err) {
        console.log(err);
    }
};
exports.findOne = (req, res) => {

};
exports.update = (req, res) => {

};
exports.delete = (req, res) => {

};
exports.deleteAll = (req, res) => {

};
exports.findAllPublished = (req, res) => {

};