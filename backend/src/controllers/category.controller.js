const db = require("../models");
const Category = db.Category;
const Topic = db.Topic;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const data = await Category.findAndCountAll(pagination);
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};
exports.findAllWithTopics = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const data = await Category.findAndCountAll({
            ...pagination,
            include: {
                model: Topic,
                as: 'topics',
                limit: 12,
                separate: true,
                order: [
                    ['createdAt', 'DESC']
                ]
            },
        });
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.findByPk = async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = await Category.findByPk(id);
        if (!data) {
            res.status(404).json({
                message: 'Category not found'
            });
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.create = async (req, res, next) => {
    try {
        const {name} = req.body;
        const data = await Category.create({name});
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};
exports.update = async (req, res, next) => {
    try {
        const {id} = req.body;
        const data = await Category.update(req.body, {where: {id}});
        if (!data[0]) {
            res.status(404).json({
                message: 'Category not found'
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
        const data = await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!data) {
            res.status(404).json({
                message: 'Category not found'
            });
            return;
        }
        res.status(200).json({message: 'Deleted'});
    } catch (e) {
        next(e)
    }
};