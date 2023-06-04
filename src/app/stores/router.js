const router = require('express').Router();
const {addItems,getItems,getItem,addCategory,getCategories,getItemsByCategory} = require('./handler');


router.post('/item/add',addItems);
router.post('/category/add',addCategory);
router.get('/items',getItems);
router.get('/item/:id',getItem);
router.get('/items/:ca_id',getItemsByCategory);
router.get('/category/all',getCategories)

module.exports = router;