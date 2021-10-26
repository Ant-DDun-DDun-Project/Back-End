const express = require('express');
const router = express.Router();
const { postComment } = require('../controllers/comment');

router.post('/:multi_id/comment', postComment);

module.exports = router;
