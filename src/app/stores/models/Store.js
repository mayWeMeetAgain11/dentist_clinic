
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StoreModels extends Model {
        static associate(models) {
            this.belongsTo(models.CategoryModels, {
                foreignKey: 'category_id',
                as: 'category',
            });
            this.hasMany(models.DoctorMaterialOrderModels, {
                foreignKey: 'store_id',
                as: 'doctor_material_orders',
            });
        }
    }
    StoreModels.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        storage: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        unit: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        limit: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },

    }, {
        sequelize,
        modelName: 'StoreModels',
        tableName: 'store',
        underscored: true,
    },
    );
    return StoreModels;
};