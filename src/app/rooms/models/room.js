
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoomModels extends Model {
        static associate(models) {
            this.belongsTo(models.DepartmentModels, {
                foreignKey: 'department_id',
                as: 'department',
            });
            this.hasMany(models.ChairModels, {
                foreignKey: 'room_id',
                as: 'chairs',
            });
        }
    }
    RoomModels.init({
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'RoomModels',
        tableName: 'rooms',
        underscored: true,
    });
    return RoomModels;
};