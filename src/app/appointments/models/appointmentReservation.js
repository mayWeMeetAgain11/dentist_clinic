
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentReservationModel extends Model {
        static associate(models) {
            this.belongsTo(models.AppointmentModel, {
                foreignKey: 'appointment_id',
                as: 'appointment',
            });
            this.belongsTo(models.ChairModel, {
                foreignKey: {
                    name: 'chair_id',
                    allowNull: false,
                },
                as: 'chair',
            });
            this.hasMany(models.DoctorMaterialOrderModel, {
                foreignKey: 'appointment_reservation_id',
                as: 'doctor_material_orders',
            });
        }
    }
    AppointmentReservationModel.init({
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
    },{
        sequelize,
        modelName: 'AppointmentReservationModel',
        tableName: 'appointment_reservations',
        underscored: true,
    });
    return AppointmentReservationModel;
};