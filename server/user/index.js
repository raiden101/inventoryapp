const router = require('express').Router();
const getProfile = require('./functions/getProfile');
const { searchById, searchByName } = require('./functions/searchItem');

router.get('/profile', getProfile);

router.get('/searchItemByName/:itemName', searchByName);

router.get('/searchByID/:itemID', searchById);


module.exports = router;