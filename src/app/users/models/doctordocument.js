
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorDocumentModels extends Model {
        static associate(models) {
        }
    }
    DoctorDocumentModels.init({
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'DoctorDocumentModels',
        tableName: 'doctor_documents',
        underscored: true
    });
    return DoctorDocumentModels;
};