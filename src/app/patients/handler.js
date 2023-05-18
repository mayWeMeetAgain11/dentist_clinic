const Patient = require('./service');


module.exports = {


    add: async (req, res) => {
        const data = req.body;

        const result = await new Patient(data).addPatint();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAll: async (req, res) => {

        const result = await Patient.getPatints();
        res.status(result.code).send({
            data: result.data,
        });
    },
    get: async (req, res) => {
        const id = req.params.id;
        const result = await Patient.getPatint(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await new Patient(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    destroy: async (req, res) => {
        const id = req.params.id;
        const result = await  Patient.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },


}