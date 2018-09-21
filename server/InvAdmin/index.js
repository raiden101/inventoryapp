const router = require('express').Router();
const addToInventory = require('./functions/addToInventory');

router.post('/addToInventory', addToInventory);

module.exports = router;