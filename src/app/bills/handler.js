const  {Bill, Payer, Tax}  = require('./service');


module.exports = {

    get: async (req, res) => {
        const id = req.params.id;
        const result = await Bill.getPatientBill(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    getAllPatientBills: async (req, res) => {
        const result = await Bill.getAllPatientsBills();
        res.status(result.code).send({
            data: result.data,
        });
    },

    addBill: async (req, res) => {
        // const {employee_id} = req.params;
        const data = req.body;
        // data.employee_id = employee_id;
        const payer = await new Payer(data).add(data);
        data.payer_id = payer.id;
        const result = await new Bill(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    addPayer: async (req, res) => {
        const data = req.body;
        const result = await new Payer(data).add(data);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addTax: async (req, res) => {
        const data = req.body;
        const result = await new Tax(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },


}