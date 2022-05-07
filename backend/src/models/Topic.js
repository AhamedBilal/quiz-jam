'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Topic extends Model {

        static associate(models) {
            Topic.belongsTo(models.Category);
            Topic.belongsTo(models.User);
            Topic.belongsToMany(models.User, {through: 'UserTopic', as: 'followers'});
            Topic.hasMany(models.GameRecord);
            Topic.hasMany(models.Question, {as: 'questions'});
            Topic.hasMany(models.Post, {as: 'posts'});
        }
    }

    Topic.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING,
        },
        cover: {
            type: DataTypes.DATE,
        },
        about: {
            type: DataTypes.STRING,
        },
        followersCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        questionsCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        sequelize,
        modelName: 'Topic',
    });
    return Topic;
};