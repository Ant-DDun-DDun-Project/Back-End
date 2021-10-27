const express = require('express');
const router = express.Router();
const { postMulti } = require('../controllers/multi-post');
const { getMulti, getIngMulti, getCompleteMulti } = require('../controllers/multi-main');
const { postComment } = require('../controllers/comment');
const { editChildComment, postChildComment } = require('../controllers/child-comment');

router.get('/', getMulti); // 객관식 게시글 메인화면
router.get('/ing', getIngMulti); // 객관식 진행중 게시글
router.get('/complete', getCompleteMulti); // 객관식 종료된 게시글
router.post('/:multi_id/comment', postComment); // 댓글
router.post('/:multi_id/comment/:comment_id', postChildComment); //대댓글 작성
router.post('/:multi_id/comment/:comment_id/delete', editChildComment); //대댓글 수정
router.post('/', postMulti); // 객관식 게시글 작성

module.exports = router;
