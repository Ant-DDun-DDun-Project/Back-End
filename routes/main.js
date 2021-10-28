const express = require('express');
const router = express.Router();
const { getMain } = require('../controllers/main');

router.get('/', getMain); //메인 뷰

module.exports = router;
