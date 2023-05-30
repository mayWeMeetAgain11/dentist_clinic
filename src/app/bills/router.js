const router = require('express').Router();
const { get } = require('./handler');


router.get('/get/:id', get);




module.exports = router;