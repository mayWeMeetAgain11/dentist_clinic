'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {

        }
    }
    AppointmentReservation.init({
        appointment_reservation_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        start: {
            type: DataTypes.DATETIME,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATETIME,
            allowNull: true,
        },
        done: {
            type: DataTypes.DATETIME,
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'AppointmentReservation',
    });
    return AppointmentReservation;
};