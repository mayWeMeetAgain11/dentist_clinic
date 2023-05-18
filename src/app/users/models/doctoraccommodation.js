
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorAccommodationModels extends Model {
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
        tableName: 'doctor_accommodations',
        underscored: true
    });
    return DoctorAccommodationModels;
};