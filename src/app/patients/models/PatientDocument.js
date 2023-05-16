const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../../utils/database/config");
const {gender} = require('./enum.json');

class PatientDocument extends Model { }
PatientDocument.init({
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
    },
    archived : {
        type: DataTypes.BOOLEAN,
        defaultValue : false,

    }

}, {
    tableName: 'patient_document',
    sequelize
},
);

module.exports = PatientDocument;