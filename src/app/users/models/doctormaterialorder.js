'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class DoctorMaterialOrderModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
}
DoctorMaterialOrderModels.init({
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            isInt: true,
        }
    },
    }, {
    sequelize,
    modelName: 'DoctorMaterialOrderModels',
    underscored: true
    });
    return DoctorMaterialOrderModels;
};