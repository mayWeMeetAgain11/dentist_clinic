const { StoreModel, CategoryModel, StoreBillModel, StoreBillMaterialModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const fs = require('fs');
const result = require('sequelize');
const Op = result.Op;

class Store {

    constructor(data, file) {
        this.name = data.name;
        this.storage = data.storage;
        this.unit = data.unit;
        this.price = data.price;
        this.limit = data.limit;
        this.photo = file.path;

    }

    async addItems() {
        try {

            const result = await StoreModel.create(this);
            return {
                data: result,
                code: httpStatus.OK,
            };

        }
        catch (error) {
            fs.unlinkSync(this.photo);
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async getItems() {
        try {

            const result = await StoreModel.findAll({
                include: {
                    model: CategoryModel,
                    as: "category"
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async searchItem(name) {
        try {

            const result = await StoreModel.findAll({
                include: {
                    model: CategoryModel,
                    as: "category"
                },
                where: {
                    name: {
                        [Op.substring]: name
                    }
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }
    
    static async getItemsByCategory(id) {
        try {

            const result = await StoreModel.findAll({
                where: {
                    category_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async getItemById(id) {
        try {

            const result = await StoreModel.findOne({
                where: {
                    id: id
                },
                include: {
                    model: CategoryModel,
                    as: "category"
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }
    
    static async order(data) {
        try {

            let result = await StoreModel.findByPk(data.store_id);
            result.storage = result.storage - data.quantity;
            result.save();
            return {
                data: result,
                code: httpStatus.OK,
            };

        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

}


class Category {


    constructor(data) {
        this.name = data.name;
    }

    async addCategory() {

        try {
            const category = await CategoryModel.create(this);
            return {
                data: category,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

    static async getCategories() {

        try {
            const categories = await CategoryModel.findAll();
            return {
                data: categories,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

}


class StoreBill {

    constructor(data) {
        this.total = data.total;
    }

    async addStoreBill() {

        try {
            const storeBill = await StoreBillModel.create(this);
            return {
                data: storeBill,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

    static async getStoreBill() {

        try {
            const storeBills = await StoreBillModel.findAll({
                include: [
                    {
                        model: StoreBillMaterialModel,
                        as: "billMaterials"
                    }
                ]
            });
            return {
                data: storeBills,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

}


class StoreBillMaterial {

    constructor(data) {
        this.quantity = data.quantity;
        this.price = data.price;
        this.store_id = data.store_id;
        this.store_bill_id = data.store_bill_id;
    }

    async addStoreBillMaterial() {

        try {
            const storeBillMaterial = await StoreBillMaterialModel.create(this);
            return {
                data: storeBillMaterial,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

    static async addStoreBillMaterialWithAllChanges(data, files) {

        try {
            materials = data.materials;
            let iterate = 0;
            materials.forEach(async material => {
                if (material.id == null) {
                    const file = files[iterate];
                    iterate ++;
                    const store = await new Store(material, file).addItems();
                    material.store_id = store.id;
                    // const storeBillMaterial = await new StoreBillMaterial(material).addStoreBillMaterial();
                } else {
                    // const storeBillMaterial = await new StoreBillMaterial(material).addStoreBillMaterial();
                    const store = await Store.order(material);
                }
                const storeBill = await new StoreBill(material).addStoreBill();
                material.store_bill_id = storeBill.id;
                const storeBillMaterial = await new StoreBillMaterial(material).addStoreBillMaterial();
            });
            // const storeBillMaterial = await StoreBillMaterialModel.create(this);
            return {
                data: "added successfully",
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

    // here id in the params is for store_bill_id
    static async getStoreBillMaterialForOneBill(id) {

        try {
            const storeBillMaterials = await StoreBillMaterialModel.findAll({
                where: {
                    store_bill_id: id
                }
            });
            return {
                data: storeBillMaterials,
                code: httpStatus.OK,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };

        }
    }

}


module.exports = { Store, Category, StoreBill, StoreBillMaterial };