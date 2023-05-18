const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BillModels extends Model {
        static associate(models) {
            this.belongsTo(models.AppointmentModels, {
                foreignKey: 'appointment_id',
                as: 'appointment',
            });
            this.belongsTo(models.UserModels, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            this.belongsTo(models.TaxModels, {
                foreignKey: 'tax_id',
                as: 'tax',
            });
        }
    }
    BillModels.init({
        payment: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'BillModels',
        tableName: 'bills',
        underscored: true,
    });
    return BillModels;
};