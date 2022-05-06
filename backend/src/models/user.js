'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class User extends Model {

        static associate(models) {
            // define association here
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATE,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        profilePic: {
            type: DataTypes.STRING,

        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};