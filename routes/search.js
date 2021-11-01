const express = require('express');
const router = express.Router();
const { searchPosts } = require('../controllers/search');
const { authForGuest } = require('../middlewares/auth');

router.get('/', authForGuest, searchPosts);

module.exports = router;
