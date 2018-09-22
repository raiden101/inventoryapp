const router = require('express').Router();
const addToInventory = require('./functions/addToInventory');
const getItemsFromInv = require('./functions/getInventory');
const updateInventoryItem = require('./functions/updateInventoryItem');
const deleteInventoryItem = require('./functions/deleteItem');
const { getExpiredItems, getLowStockItems } = require('./functions/notifications');

router.post('/addToInventory', addToInventory);

router.post('/getInventoryItems', getItemsFromInv);

router.post('/updateInventoryItem', updateInventoryItem);

router.post('/deleteInventoryItem', deleteInventoryItem);

router.get('/getExpiredItems', getExpiredItems);

router.get('/getLowStockItems', getLowStockItems);

module.exports = router;