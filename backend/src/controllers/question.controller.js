const db = require("../models");
const Question = db.Question;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const data = await Question.findAndCountAll(pagination);
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.findByPk = async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = await Question.findByPk(id);
        if (!data) {
            res.status(404).json({
                message: 'Question not found'
            });
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = await Question.create({...req.body});
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};
exports.update = async (req, res, next) => {
    try {
        const {id} = req.body;
        const data = await Question.update(req.body, {where: {id}});
        if (!data[0]) {
            res.status(404).json({
                message: 'Question not found'
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
        const data = await Question.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!data) {
            res.status(404).json({
                message: 'Question not found'
            });
            return;
        }
        res.status(200).json({message: 'Deleted'});
    } catch (e) {
        next(e)
    }
};