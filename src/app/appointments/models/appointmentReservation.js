
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentReservationModels extends Model {
        static associate(models) {
        }
    }
    AppointmentReservationModels.init({
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        done: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'AppointmentReservationModels',
        tableName: 'appointment_reservations',
        underscored: true,
    });
    return AppointmentReservationModels;
};