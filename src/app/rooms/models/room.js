
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoomModels extends Model {
        static associate(models) {
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