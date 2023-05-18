
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentModels extends Model {
        static associate(models) {
            this.belongsTo(models.PatientModel, {
                foreignKey: 'patient_id',
                as: 'patient',
            });
            this.belongsTo(models.UserModels, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            this.belongsTo(models.UserModels, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
            this.hasMany(models.AppointmentReservationModels, {
                foreignKey: 'appointment_id',
                as: 'appointment_reservations',
            });
            this.hasMany(models.BillModels, {
                foreignKey: 'appointment_id',
                as: 'bills',
            });
        }
    }
    AppointmentModels.init({
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
        modelName: 'AppointmentModels',
        tableName: 'appointments',
        underscored: true
    });
    return AppointmentModels;
};