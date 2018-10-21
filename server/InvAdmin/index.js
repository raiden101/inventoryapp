const router = require('express').Router();
const addToInventory = require('./functions/addToInventory');
const getItemsFromInv = require('./functions/getInventory');
const updateInventoryItem = require('./functions/updateInventoryItem');
const deleteInventoryItem = require('./functions/deleteItem');
const getNotifications = require('./functions/notifications');
const addNewShop = require('./functions/addNewShop');
const { getOrders, getOrderedItems } = require('./functions/getOrders');
const getAllUsers = require('./functions/getAllUsers');

router.post('/addToInventory', addToInventory);

router.post('/getInventoryItems', getItemsFromInv);

router.post('/updateInventoryItem', updateInventoryItem);

router.post('/deleteInventoryItem', deleteInventoryItem);

router.get('/getNotifications', getNotifications);

router.post('/addNewShop', addNewShop);

router.get('/getOrders', getOrders);

router.post('/getOrderedItems', getOrderedItems);

router.get('/getAllUsers', getAllUsers);

module.exports = router;