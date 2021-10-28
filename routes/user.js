const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user');
const { CheckDuplicatedId, CheckDuplicatedNick } = require('../controllers/signup-duplication');

router.post('/signup', signup);
router.post('/signup/id', CheckDuplicatedId);
router.post('/signup/nick', CheckDuplicatedNick);
router.post('/login', login);

module.exports = router;
