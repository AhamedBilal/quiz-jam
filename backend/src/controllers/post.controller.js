const db = require("../models");
const Post = db.Post;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res, next) => {
    try {
        let pagination = {};
        if (req.query.offset && req.query.limit) {
            pagination.offset = +req.query.offset;
            pagination.limit = +req.query.limit;
        }
        const data = await Post.findAndCountAll(pagination);
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.findByPk = async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = await Post.findByPk(id);
        if (!data) {
            res.status(404).json({
                message: 'Not found'
            });
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = await Post.create({...req.body});
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};
exports.update = async (req, res, next) => {
    try {
        const {id} = req.body;
        const data = await Post.update(req.body, {where: {id}});
        if (!data[0]) {
            res.status(404).json({
                message: 'Not found'
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
        const  data = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!data) {
            res.status(404).json({
                message: 'Not found'
            });
            return;
        }
        res.status(200).json({message: 'Deleted'});
    } catch (e) {
        next(e)
    }
};