'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class UserTopic extends Model {
    }

    UserTopic.init({
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        },
        winRate: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        }
    }, {
        sequelize,
        modelName: 'UserTopic',
    });
    return UserTopic;
};