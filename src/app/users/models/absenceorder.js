'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class AbsenceOrderModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
}
AbsenceOrderModels.init({
    accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'The start date is required'
            },
        }
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            msg: 'The end date is required'
        }
    },
    }, {
    sequelize,
    modelName: 'AbsenceOrderModels',
    underscored: true
    });
    return AbsenceOrderModels;
};