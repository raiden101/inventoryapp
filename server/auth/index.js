const router = require('express').Router();
const login = require('./login');
const checkAuth = require('./checkAuth');

router.post('/login', login);

router.post('/checkAuth', checkAuth);

module.exports = router;