const  Bill  = require('./service');


module.exports = {

    get: async (req, res) => {
        const id = req.params.id;
        const result = await Bill.getPatientBill(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addBill: async (req, res) => {
        const {employee_id} = req.params;
        const data = req.body;
        data.employee_id = employee_id;
        const result = await new Bill(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },


}