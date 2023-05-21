const User = require('./service');


module.exports = {

    getAll: async (req, res) => {
        const type = req.params.type;
        console.log(req.params);
     //  const type = req.body;
        const result = await User.getAllUsers(type);
        res.status(result.code).send({
            data: result.data,
        });
    },


    add: async (req, res) => {
        const data = req.body;

        const result = await new User(data).addUser();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        const result = await User.getOneUser(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await new User(data).updateUser(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    destroy: async (req, res) => {
        const id = req.params.id;
        const result = await  User.deleteUser(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    login: async (req, res) => {
        const data = req.body;
        // console.log("data");
        // console.log(data);

        const result = await  User.login(data);
        res.status(result.code).send({
            data: result.data,
        });
    },


}