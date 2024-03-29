'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Comment extends Model {

        static associate(models) {
            Comment.belongsTo(models.Post);
            Comment.belongsTo(models.User);
            Comment.hasMany(models.Comment, {as: 'comments', foreignKey: 'parentCommentId'});
        }
    }

    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};