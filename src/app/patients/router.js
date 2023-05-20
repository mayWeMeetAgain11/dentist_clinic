const { destroy, add, get, getAll, update, addDocument, getDocuments, updateDocument, deleteDocument } = require('./handler');
const router = require('express').Router();

router.post('/create', add);
router.get('/getall', getAll);
router.get('/get/:id', get);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);
router.post('/document/add', addDocument);
router.get('/document/get/:id', getDocuments);
router.put('/document/update/:id', updateDocument);
router.delete('/document/delete/:id', deleteDocument);

module.exports = router;