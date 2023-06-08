const { StoreModel, CategoryModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const fs = require('fs');
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
module.exports = { Store, Category };