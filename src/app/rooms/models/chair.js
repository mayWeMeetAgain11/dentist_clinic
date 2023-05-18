
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChairModels extends Model {
        static associate(models) {
        }
    }
    ChairModels.init({
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ChairModels',
        tableName: 'chairs',
        underscored: true,
    });
    return ChairModels;
};