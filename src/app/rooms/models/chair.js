'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {

        }
    }
    Chair.init({
        chair_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Chair',
    });
    return Chair;
};