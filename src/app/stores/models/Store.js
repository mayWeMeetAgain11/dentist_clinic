
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StoreModels extends Model { }
    StoreModels.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        storage: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        unit: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        limit: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },

    }, {
        sequelize,
        modelName: 'StoreModels',
        tableName: 'store',
        underscored: true,
    },
    );
    return StoreModels;
};