'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class UserTopic extends Model {

        static associate(models) {
            UserTopic.belongsTo(models.User);
            UserTopic.belongsTo(models.Topic)
        }
    }

    UserTopic.init({
        role: {
            type: DataTypes.STRING,
            defaultValue: 'member',
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