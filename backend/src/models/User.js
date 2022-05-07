'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class User extends Model {

        static associate(models) {
            User.belongsToMany(User, {
                foreignKey: 'userFirstId',
                otherKey: 'userSecondId',
                as: 'friends',
                through: 'UserRelationship'
            });
            User.belongsToMany(models.Topic, {through: 'UserTopic', as: 'topics'});
            User.hasMany(models.Topic);
            User.hasMany(models.Post);
            User.hasMany(models.Comment);
            User.hasMany(models.GameRecord);
            User.belongsToMany(models.Post, {through: 'Like'});
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
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        online: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        firebaseToken: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};