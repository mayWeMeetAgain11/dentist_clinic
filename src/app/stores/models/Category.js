const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CategoryModels extends Model { }
    CategoryModels.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'CategoryModels',
        tableName: 'categories',
        underscored: true,
    });
    return CategoryModels;
};