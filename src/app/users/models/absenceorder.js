
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AbsenceOrderModels extends Model {
        static associate(models) {
            this.belongsTo(models.UserModels, {
                foreignKey: 'user_id',
                as: 'user',
            });
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
        tableName: 'absence_orders',
        underscored: true
    });
    return AbsenceOrderModels;
};