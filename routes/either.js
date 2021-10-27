const express = require('express');
const router = express.Router();
const { getEither, postEither } = require('../controllers/either');

router.get('/', getEither);
router.post('/', postEither);

module.exports = router;
