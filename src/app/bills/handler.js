const  Bill  = require('./service');


module.exports = {

    get: async (req, res) => {
        const id = req.params.id;
        const result = await Bill.getPatientBill(id);
        res.status(result.code).send({
            data: result.data,
        });
    },


}