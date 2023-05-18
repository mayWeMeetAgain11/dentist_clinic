
const { gender } = require('../../patients/models/enum.json');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserModels extends Model {
        static associate(models) {
        }
    }
    UserModels.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "First Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "First Name must be between 2 and 50 characters long",
                },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "First Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "First Name must be between 2 and 50 characters long",
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
                    msg: "Email cannot be empty",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email address",
                },
                notEmpty: {
                    args: true,
                    msg: "Email cannot be empty",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Password cannot be empty",
                },
                len: {
                    args: [8, 100],
                    msg: "Password must be between 8 and 100 characters long",
                },
                // isStrongPassword: function(value) {
                //     if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                //     throw new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
                //     }
                // },
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
                isValidPhoneNumber: function (value) {
                    if (!value.match(/^09\d{8}$/)) {
                        throw new Error("Phone number must start with '09' and have exactly 10 digits");
                    }
                },
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "City cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "City must be between 2 and 50 characters long",
                },
            },
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Region cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Region must be between 2 and 50 characters long",
                },
            },
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Street cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Street must be between 2 and 50 characters long",
                },
            },
        },
        near_by: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Name must be between 2 and 50 characters long",
                },
            },
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "age cannot be empty",
                }
            },
        },
        gender: {
            type: DataTypes.ENUM,
            values: gender,
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
        deserve: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'UserModels',
        tableName: 'users',
        underscored: true
    });
    return UserModels;
};