
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StoreModel extends Model {
        static associate(models) {
            this.belongsTo(models.CategoryModel, {
                foreignKey: 'category_id',
                as: 'category',
            });
            this.hasMany(models.DoctorMaterialOrderModel, {
                foreignKey: 'store_id',
                as: 'doctor_material_orders',
            });
        }
    }
    StoreModel.init({
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
        modelName: 'StoreModel',
        tableName: 'store',
        underscored: true,
    },
    );
    return StoreModel;
};