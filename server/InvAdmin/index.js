const router = require('express').Router();
const addToInventory = require('./functions/addToInventory');
const getItemsFromInv = require('./functions/getInventory');
const updateInventoryItem = require('./functions/updateInventoryItem');

router.post('/addToInventory', addToInventory);

router.post('/getInventoryItems', getItemsFromInv);

router.post('/updateInventoryItem', updateInventoryItem);

module.exports = router;