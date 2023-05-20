const { destroy, add, getOne, getAll, update } = require('./handler');
const router = require('express').Router();

router.post('/create', add);
router.get('/getall/:type', getAll);
router.get('/get/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;