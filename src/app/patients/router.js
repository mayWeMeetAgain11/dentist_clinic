const { destroy, add, get, getAll, update } = require('./handler');
const router = require('express').Router();

router.post('/create', add);
router.get('/getall', getAll);
router.get('/get/:id', get);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;