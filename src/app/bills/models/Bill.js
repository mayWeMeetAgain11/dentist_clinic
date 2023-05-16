const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../../utils/database/config");


class Bill extends Model { }
Bill.init({
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    tax_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'bills',
    sequelize
});

module.exports = Bill;