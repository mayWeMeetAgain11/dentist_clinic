const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BillModel extends Model {
        static associate(models) {
            this.belongsTo(models.AppointmentModel, {
                foreignKey: 'appointment_id',
                as: 'appointment',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            this.belongsTo(models.TaxModel, {
                foreignKey: 'tax_id',
                as: 'tax',
            });
        }
    }
    BillModel.init({
        payment: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'BillModel',
        tableName: 'bills',
        underscored: true,
    });
    return BillModel;
};