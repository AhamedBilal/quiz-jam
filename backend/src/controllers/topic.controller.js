const db = require("../models");
const {DataTypes} = require("sequelize/types");
const Topic = db.Topic;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const data = await Topic.findAndCountAll(pagination);
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.findByPk = async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = await Topic.findByPk(id);
        if (!data) {
            res.status(404).json({
                message: 'Topic not found'
            });
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = await Topic.create({...req.body});
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};
exports.update = async (req, res, next) => {
    try {
        const {id} = req.body;
        const data = await Topic.update(req.body, {where: {id}});
        if (!data[0]) {
            res.status(404).json({
                message: 'Topic not found'
            });
            return;
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};
exports.delete = async (req, res, next) => {
    try {
        const data = await Topic.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!data) {
            res.status(404).json({
                message: 'Topic not found'
            });
            return;
        }
        res.status(200).json({message: 'Deleted'});
    } catch (e) {
        next(e)
    }
};