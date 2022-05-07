'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Like extends Model {
    }

    Like.init({

    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};