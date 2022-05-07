'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Question extends Model {

        static associate(models) {
            Question.belongsTo(models.Topic);
        }
    }

    Question.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answers: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Question',
    });
    return Question;
};