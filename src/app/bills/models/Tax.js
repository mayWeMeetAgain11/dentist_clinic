
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TaxModels extends Model {
        static associate(models) {
            this.hasMany(models.BillModels, {
                foreignKey: 'tax_id',
                as: 'bills',
            });
        }
    }
    TaxModels.init({
        percent: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'TaxModels',
        tableName: 'taxs',
        underscored: true,
    });
    return TaxModels;
};