'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {

        }
    }
    Appointment.init({
        appointment_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    }, {
        sequelize,
        modelName: 'Appointment',
    });
    return Appointment;
};