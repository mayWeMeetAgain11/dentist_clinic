const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../../utils/database/config");


class Tax extends Model { }
Tax.init({
    percent: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    tableName: 'taxes',
    sequelize
});

module.exports = Tax;