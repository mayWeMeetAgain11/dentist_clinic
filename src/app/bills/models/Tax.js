
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TaxModels extends Model { }
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