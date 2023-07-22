const router = require('express').Router();
const { get, addBill, addPayer, addTax, getAllPatientBills, getAllBillsWithMaterials, getAllForPdf } = require('./handler');

// bill
router.get('/get/:id', get);
router.get('/getAll', getAllPatientBills);
router.get('/getAllForPdf', getAllForPdf);

router.post('/add', addBill);

// payer
router.post('/payer/add', addPayer);

// tax
router.post('/tax/add', addTax);




module.exports = router;