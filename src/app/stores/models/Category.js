const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../../utils/database/config");


class Category extends Model { }
Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categories',
    sequelize
});

module.exports = Category;