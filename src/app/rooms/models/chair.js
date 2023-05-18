
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChairModels extends Model {
        static associate(models) {
            this.hasMany(models.AppointmentReservationModels, {
                foreignKey: 'chair_id',
                as: 'appointment_reservations',
            });
            this.belongsTo(models.RoomModels, {
                foreignKey: 'room_id',
                as: 'room',
            });
        }
    }
    ChairModels.init({
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ChairModels',
        tableName: 'chairs',
        underscored: true,
    });
    return ChairModels;
};