'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class UserRelationship extends Model {
        static associate(models) {
            UserRelationship.belongsTo(models.User, {foreignKey: 'userFirstId'})
            UserRelationship.belongsTo(models.User, {foreignKey: 'userSecondId'})
        }
    }

    UserRelationship.init({
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'UserRelationship',
    });
    return UserRelationship;
};