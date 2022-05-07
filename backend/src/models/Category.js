'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Category extends Model {

        static associate(models) {
            Category.hasMany(models.Topic, {as: 'topics'});
        }
    }

    Category.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};