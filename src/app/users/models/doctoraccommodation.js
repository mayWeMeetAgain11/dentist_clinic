'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class DoctorAccommodationModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
}
DoctorAccommodationModels.init({
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Please provide a valid date before creating aDoctor'
            },
        }
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    sequelize,
    modelName: 'DoctorAccommodationModels',
    underscored: true
    });
    return DoctorAccommodationModels;
};