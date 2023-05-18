const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CategoryModels extends Model {
        static associate(models) {
            this.hasMany(models.StoreModels, {
                foreignKey: 'category_id',
                as: 'stores',
            });
        }
    }
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