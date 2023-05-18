
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DepartmentModels extends Model {
        static associate(models) {
            this.belongsTo(models.UserModels, {
                foreignKey: 'manager_id',
                as: 'manager',
            });
            this.hasMany(models.RoomModels, {
                foreignKey: 'department_id',
                as: 'rooms',
            });
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