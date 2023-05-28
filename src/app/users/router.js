const { destroy, add, getOne, getAll, update , login,  getAllDocument, addDocument} = require('./handler');
const router = require('express').Router();
const multer = require('multer');
const upload = require('../../../utils/fileFunctions/file_pdf').upload;


// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/pdf');
//     },
//     // filename: (req, file, cb) => {
//     //     // cb(null, file.originalname);
//     //     // new date().toISOString() + '-' +
//     //     cb(null, Date.now() + path.extname(file.originalname)) ;
//     // }
//     // filename: function (req, file, cb) { 
//     //     cb(null, file.fieldname + '-' + Date.now())
//     //   }
//     filename: (req, file, cb) => {  
//         cb(null, file.originalname);
//         // new date().toISOS tring() + '-' + 
//     }
// });
// const fileFilter = (req, file, cb) => {
//         cb(null, true);
// };

// const upload = multer({ storage: fileStorage, fileFilter: fileFilter });


//user 
router.post('/create', add);
router.get('/getall/:type', getAll);
router.get('/get/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);
router.post('/login', login);

//doctor document

router.get('/doctorDocument/:id', getAllDocument);
router.post('/createDocument', upload.single('document'), addDocument);


module.exports = router; 