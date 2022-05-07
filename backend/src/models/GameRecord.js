'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class GameRecord extends Model {

        static associate(models) {
            GameRecord.belongsTo(models.Topic);
            GameRecord.belongsTo(models.User);
        }
    }

    GameRecord.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'GameRecord',
    });
    return GameRecord;
};