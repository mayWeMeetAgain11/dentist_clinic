const multer = require('multer');
const doctordocument = require('./models/doctordocument');
const {User, DoctorDocument, DoctorDocumentAccommodation, AbsenceOrder} = require('./service');




// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // cb(null, 'public/pdf/contractor');
//         cb(null, '././././Documents');
//     },
//     filename: (req, file, cb) => {
//         // cb(null, file.originalname);
//         // new date().toISOString() + '-' +
//         cb(null, Date.now() + path.extname(file.originalname)) ;
//     }
// });
// const fileFilter = (req, file, cb) => {
//         // cb(null, true);
//         const fileTypes = /pdf/
//         const mimeType = fileTypes.test(file.mimeType);
//         const extname = fileTypes.test(path.extname(file.originalname));
//         if(extname && mimeType){
//             return cb(null, true);
//         }
//         cb('Give proper files formats to upload');
// };

// const upload = multer({ storage: fileStorage, limits: {/**fileSize: '1000000'*/} ,fileFilter: fileFilter }).single('pdf')

module.exports = {
    
   // user
    

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
        console.log("kkk");
        const result = await new User(data).addUser();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        const type = req.params.type;

        const result = await User.getOneUser(id, type);
        res.status(result.code).send({
            data: result.data ,
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

    loginHandler: async (req, res) => {
        console.log("before fetch data");
        const data = req.body;
        console.log("data");
        console.log(data);

        const result = await  User.login(data);
        res.status(result.code).send({
            data: result.data,
        });
    },

    //doctor document
    
    getAllDocument: async (req, res) => {

        const {id} = req.params;
        // const { path } = req.file;
        console.log(req.params);
     //  const type = req.body;
        const result = await DoctorDocument.getAllDocument(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addDocument: async (req, res) => {
        const data = req.body;
        const { path } = req.file;
        const result = await new DoctorDocument(data, path).addDocument();
        res.status(result.code).send({
            data: result.data,
        });
    },

    // doctor aaccommodation document

    getAllDocumentAccommodation: async (req, res) => {

        const {id} = req.params;
       // const { path } = req.file;
        console.log(req.params);
    //  const type = req.body;
        const result = await DoctorDocumentAccommodation.getAllDocumentAccommodation(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addDocumentAccommodation: async (req, res) => {
        const data = req.body;
        const  path  = req.file.path;
            const result = await new DoctorDocumentAccommodation(data, path).addDocumentAccommodation();
        res.status(result.code).send({
            data: result.data,
        });
    },

   // Absence order

    getAllAbsenceOrders: async (req, res) => {
        const {id} = req.params;

        const result = await AbsenceOrder.getAllAbsenceOrder(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addAbsenceOrder: async (req, res) => {
        console.log(req.body);
        const data = req.body;
        const result = await new AbsenceOrder(data).addAbsenceOrder();
        res.status(result.code).send({
            data: result.data,
        });
    },

}