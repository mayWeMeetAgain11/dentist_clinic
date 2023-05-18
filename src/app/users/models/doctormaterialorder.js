
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorMaterialOrderModels extends Model {
        static associate(models) {
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