const router = require('express').Router();
const { get, addBill, addPayer, addTax, getAllPatientBills, getAllBillsWithMaterials } = require('./handler');

// bill
router.get('/get/:id', get);
router.get('/getAll', getAllPatientBills);

router.post('/add', addBill);

// payer
router.post('/payer/add', addPayer);

// tax
router.post('/tax/add', addTax);




module.exports = router;