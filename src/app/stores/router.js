const router = require('express').Router();
const {addItems,getItems,getItem,addCategory,getCategories,getItemsByCategory,orderItem, getItemByName, addStoreBillWithMaterials} = require('./handler');
const  multer = require('../../../utils/fileFunctions/uploadImage');


router.post('/item/add', multer.single('images') ,addItems);
router.post('/category/add',addCategory);
router.get('/items',getItems);
router.get('/item/:id',getItem);
router.post('/item/search',getItemByName);
router.get('/items/:ca_id',getItemsByCategory);
router.get('/category/all',getCategories)
router.post('/bill/add',multer.array('images'), addStoreBillWithMaterials)

// for doctor to take item from the store
// router.put('/item/order/:doctor_id',orderItem);

module.exports = router;