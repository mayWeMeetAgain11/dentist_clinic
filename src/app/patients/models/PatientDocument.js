
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PatientDocumentModels extends Model {
        static associate(models) {
            this.belongsTo(models.PatientModels, {
                foreignKey: 'patient_id',
                as: 'patient',
            });
        }
    }
    PatientDocumentModels.init({
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize,
        modelName: 'PatientDocumentModels',
        tableName: 'patient_documents',
        underscored: true,
    },
    );
    return PatientDocumentModels;
};