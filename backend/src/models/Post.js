'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Post extends Model {

        static associate(models) {
            Post.belongsTo(models.Topic);
            Post.belongsTo(models.User);
            Post.hasMany(models.Comment, {as: 'comments'});
            Post.belongsToMany(models.User, {through: 'Like'});
        }
    }

    Post.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        video: {
            type: DataTypes.DATE,
        },
        likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        commentsCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};