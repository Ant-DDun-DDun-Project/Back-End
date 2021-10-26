const express = require('express');
const router = express.Router();
const { postMulti } = require('../controllers/multi-post');
const { mainMulti } = require('../controllers/multi-main');
const { postComment } = require('../controllers/comment');

router.get('/', mainMulti);
router.post('/:multi_id/comment', postComment); // 댓글 
router.post('/', postMulti);  // 객관식 게시글 작성

module.exports = router;