const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../../utils/database/config");


class Store extends Model { }
Store.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storage: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
    },
    category_id: {
        type: DataTypes.INTEGER,
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
    tableName: 'store',
    sequelize
},
);

module.exports = Store;