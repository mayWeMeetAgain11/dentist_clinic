const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../../utils/database/config");
const {gender} = require('./enum.json');

class Patient extends Model { }
Patient.init({
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "patient first name cannot be empty",
            },
            len: {
                args: [2, 50],
                msg: "patient first Name must be between 2 and 50 characters long",
            },
        },
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "patient last name cannot be empty",
            },
            len: {
                args: [2, 50],
                msg: "patient last name must be between 2 and 50 characters long",
            },
        },
    },
    card_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: "card id cannot be empty",
            },
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Phone number cannot be empty",
            },
        },
    },
    gender: {
        type: DataTypes.ENUM,
        values :gender,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Gender cannot be empty",
            },
            len: {
                args: [2, 50],
                msg: "Gender must be between 2 and 50 characters long",
            },
        },
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "birthdate cannot be empty",
            }
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Address cannot be empty",
            },
            len: {
                args: [2, 50],
                msg: "Address must be between 2 and 50 characters long",
            },
        },
    },

}, {
    tableName: 'patients',
    sequelize
},
);

module.exports = Patient;