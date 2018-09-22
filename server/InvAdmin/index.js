const router = require('express').Router();
const addToInventory = require('./functions/addToInventory');
const getItemsFromInv = require('./functions/getInventory');
const updateInventoryItem = require('./functions/updateInventoryItem');
const deleteInventoryItem = require('./functions/deleteItem');

router.post('/addToInventory', addToInventory);

router.post('/getInventoryItems', getItemsFromInv);

router.post('/updateInventoryItem', updateInventoryItem);

router.post('/deleteInventoryItem', deleteInventoryItem);

module.exports = router;