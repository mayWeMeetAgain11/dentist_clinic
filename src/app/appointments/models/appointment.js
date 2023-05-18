
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentModel extends Model {
        static associate(models) {
            this.belongsTo(models.PatientModel, {
                foreignKey: 'patient_id',
                as: 'patient',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
            this.hasMany(models.AppointmentReservationModel, {
                foreignKey: 'appointment_id',
                as: 'appointment_reservations',
            });
            this.hasMany(models.BillModel, {
                foreignKey: 'appointment_id',
                as: 'bills',
            });
        }
    }
    AppointmentModel.init({
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
        modelName: 'AppointmentModel',
        tableName: 'appointments',
        underscored: true
    });
    return AppointmentModel;
};