'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class WorkHourModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
}
WorkHourModels.init({
    day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'The day is required'
            },
        }
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
            notEmpty: {
                args: true,
                msg: 'The end date is required'
            },
        }
    },
    }, {
    sequelize,
    modelName: 'WorkHourModels',
    underscored: true
    });
    return WorkHourModels;
};