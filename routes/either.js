const express = require('express');
const router = express.Router();
const {
  getEither,
  getIngEither,
  getCompleteEither,
  postEither,
  editEither,
} = require('../controllers/either');

router.get('/', getEither);
router.get('/ing', getIngEither);
router.get('/complete', getCompleteEither);
router.post('/', postEither);

module.exports = router;
