const { destroy, add, getOne, getAll, update , login,  getAllDocument, addDocument,getAllDocumentAccommodation , addDocumentAccommodation} = require('./handler');
const router = require('express').Router();
const multer = require('multer');
const upload = require('../../../utils/fileFunctions/file_pdf').upload;

//user 
router.post('/create', add);
router.get('/getall/:type', getAll);
router.get('/get/:id/:type', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);
router.post('/login', login);

//doctor document

router.get('/doctorDocument/:id', getAllDocument);
router.post('/createDocument', upload.single('document'), addDocument);

// doctor ducument accommodation

router.get('/doctorDocumentAccommodation/:id', getAllDocumentAccommodation);
router.post('/createDocumentAccommodation', upload.single('document'), addDocumentAccommodation);


module.exports = router; 