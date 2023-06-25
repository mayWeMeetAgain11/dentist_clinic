const router = require('express').Router();
const {addItems,getItems,getItem,addCategory,getCategories,getItemsByCategory,orderItem, getItemByName} = require('./handler');
const  multer = require('../../../utils/fileFunctions/uploadImage');


router.post('/item/add', multer.single('images') ,addItems);
router.post('/category/add',addCategory);
router.get('/items',getItems);
router.get('/item/:id',getItem);
router.post('/item/search',getItemByName);
router.get('/items/:ca_id',getItemsByCategory);
router.get('/category/all',getCategories)

// for doctor to take item from the store
// router.put('/item/order/:doctor_id',orderItem);

module.exports = router;