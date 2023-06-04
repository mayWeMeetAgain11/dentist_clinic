
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
            defaultValue: "",
        },
        storage: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "number",
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        limit: {
            type: DataTypes.BIGINT,
            allowNull: false,
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