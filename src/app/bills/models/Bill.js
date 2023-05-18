const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BillModels extends Model { }
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