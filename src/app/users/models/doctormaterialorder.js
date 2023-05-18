
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorMaterialOrderModels extends Model {
        static associate(models) {
            this.belongsTo(models.UserModels, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
            this.belongsTo(models.StoreModels, {
                foreignKey: 'store_id',
                as: 'store',
            });
            this.belongsTo(models.AppointmentReservationModels, {
                foreignKey: 'appointment_reservation_id',
                as: 'appointment_reservation',
            });
        }
    }
    DoctorMaterialOrderModels.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isInt: true,
            }
        },
    }, {
        sequelize,
        modelName: 'DoctorMaterialOrderModels',
        tableName: 'doctor_material_orders',
        underscored: true
    });
    return DoctorMaterialOrderModels;
};