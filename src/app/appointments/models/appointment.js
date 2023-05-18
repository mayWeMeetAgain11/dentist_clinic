
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentModels extends Model {
        static associate(models) {
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