const { Store, Category, StoreBill, StoreBillMaterial } = require('./service');
const {sequelize} = require('../../../utils/database/config');


module.exports = {

    addItems: async (req, res) => {

        const data = req.body;
        const file = req.file;

        const result = await new Store(data,file).addItems();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getItems: async (req, res) => {

        const result = await Store.getItems();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getItem: async (req, res) => {

        const { id } = req.params;
        const result = await Store.getItemById(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    getItemsByCategory: async (req, res) => {

        const { ca_id } = req.params;
        const result = await Store.getItemsByCategory(ca_id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addCategory: async (req, res) => {
        const data = req.body;

        const result = await new Category(data).addCategory();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getCategories: async (req, res) => {

        const result = await Category.getCategories();
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    // orderItem: async (req, res) => {
    //     const data = req.body;
    //     const {doctor_id} = req.params;
    //     data.doctor_id = doctor_id;
    //     const result = await new Store(data).order(data);
    //     res.status(result.code).send({
    //         data: result.data,
    //     });
    // },

    addStoreBillWithMaterials: async (req, res) => {

        const data = req.body;
        const files = req.files;

        try{
            const result = await sequelize.transaction(async (t) => {
                const result1 = await StoreBillMaterial.addStoreBillMaterialWithAllChanges(data, files, { transaction: t });
                // data.store_bill_id = result1.id;
                // console.log("after first fun in t");
                // const result2 = await new StoreBillMaterial(data).addStoreBillMaterial({ transaction: t });
                // console.log("after second fun in t");
                return { result1 };
            });
            // console.log("after retuurn two results");
            res.status(result.result1.code).send({
                data: result.result1.data,
            });

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    },

    getItemByName: async (req, res) => {

        const {name} = req.body;

        const result = await Store.searchItem(name);
        res.status(result.code).send({
            data: result.data,
        });
    },


}