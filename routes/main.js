const express = require('express');
const router = express.Router();
const { getMain } = require('../controllers/main');
const { authForGuest } = require('../middlewares/auth');

router.get('/', authForGuest, getMain); //메인 뷰

module.exports = router;
