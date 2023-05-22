
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentReservationModel extends Model {

        customValidation(days) {
            const today = new Date();
            const outOfRange = new Date(today);
            outOfRange.setDate(today.getDate() + days);
            const outOfRangeISO = outOfRange.toISOString().split('T')[0];
            return outOfRangeISO;
        }

        static associate(models) {
            this.belongsTo(models.AppointmentModel, {
                foreignKey: 'appointment_id',
                as: 'appointment',
            });
            this.belongsTo(models.ChairModel, {
                foreignKey: {
                    name: 'chair_id',
                    allowNull: false,
                },
                as: 'chair',
            });
            this.hasMany(models.DoctorMaterialOrderModel, {
                foreignKey: 'appointment_reservation_id',
                as: 'doctor_material_orders',
            });
        }
    }
    AppointmentReservationModel.init({
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
            },
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true
                },
                isAfter: {
                    args: function (value, next) {
                        const yesterday = this.customValidation(-1);
                        next(yesterday);
                    },
                    msg: "the date should be after today's date",
                },
                isDate: true,
                comment: "you add date after today's date, make sure the start date is not empty!"
            }
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: {
                    args: false
                },
                isAfter: {
                    args: function (value, next) {
                        const yesterday = this.customValidation(-1);
                        next(yesterday);
                    },
                    msg: "the date should be today's date or after",
                },
                isDate: true,
            }
        },
        done: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                // customValidation(days) {
                //     const today = new Date();
                //     const outOfRange = new Date(today);
                //     outOfRange.setDate(today.getDate() + days);
                //     const outOfRangeISO = outOfRange.toISOString().split('T')[0];
                //     return outOfRangeISO;
                // },
                notEmpty: {
                    args: false
                },
                isAfter: {
                    args: function (value, next) {
                        const yesterday = this.customValidation(-1);
                        next(yesterday);
                    },
                },
                isBefore: {
                    args: function (value, next) {
                        const tomorrow = this.customValidation(1);
                        next(tomorrow);
                    },
                },
                isDate: true,
                comment: "the date must be the same date of today"
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 2000],
                isString: true,
                matches: /^[a-zA-Z0-9\s\\.,!?"'-]*$/,
            },
        },
    },{
        sequelize,
        modelName: 'AppointmentReservationModel',
        tableName: 'appointment_reservations',
        underscored: true,
    });
    return AppointmentReservationModel;
};