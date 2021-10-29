const express = require('express');
const router = express.Router();
const { searchPosts } = require('../controllers/search');

router.get('/', searchPosts);

module.exports = router;
