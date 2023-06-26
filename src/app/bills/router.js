const router = require('express').Router();
const { get, addBill } = require('./handler');


router.get('/get/:id', get);
router.post('/add/:employee_id', addBill);




module.exports = router;