const express = require('express');
const router = express.Router();
const { postEither } = require('../controllers/either');

router.post('/', postEither);

module.exports = router;
