const express = require('express');
const router = express.Router();
const {
  getEither,
  getIngEither,
  getCompleteEither,
  postEither,
  editEither,
  deleteEither,
} = require('../controllers/either');

router.get('/', getEither);
router.get('/ing', getIngEither);
router.get('/complete', getCompleteEither);
router.post('/', postEither);
router.patch('/:either_id/edit', editEither);
router.delete('/:either_id', deleteEither);

module.exports = router;
