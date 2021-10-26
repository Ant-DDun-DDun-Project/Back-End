const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const { CheckDuplicatedId, CheckDuplicatedNick } = require('../controllers/signup-duplication');

router.post('/signup', signup);
router.post('/signup/id', CheckDuplicatedId);
router.post('/signup/nick', CheckDuplicatedNick);

const { signup } = require('../controllers/signup');
const { login } = require('../controllers/login');

router.post('/signup', signup);
router.post('/login', login);


module.exports = router;
