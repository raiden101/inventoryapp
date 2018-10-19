const router = require('express').Router();
const getProfile = require('./functions/getProfile');
const { searchById, searchByName } = require('./functions/searchItem');
const addToCart = require('./functions/addToCart');
const itemInfo = require('./functions/itemInfo');
const getCartItems = require('./functions/getCartItems');
const removeFromCart = require('./functions/removeFromCart');
const { orderAll, orderItem } = require('./functions/orderItems');

router.get('/profile', getProfile);

router.get('/searchItemByName/:itemName', searchByName);

router.get('/searchByID/:itemID', searchById);

router.get('/itemInfo/:itemID', itemInfo);

router.post('/addToCart', addToCart);

router.get('/getCartItems', getCartItems);

router.get('/removeFromCart/:itemID', removeFromCart);

router.get('/orderAll', orderAll);

router.post('/orderItem', orderItem);


module.exports = router;