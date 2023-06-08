const { Store, Category } = require('./service');


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


}