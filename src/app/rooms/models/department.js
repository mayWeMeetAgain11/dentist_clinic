
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DepartmentModels extends Model {
        static associate(models) {
        }
    }
    DepartmentModels.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'DepartmentModels',
        tableName: 'departments',
        underscored: true,
    });
    return DepartmentModels;
};