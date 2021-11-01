const express = require('express');
const router = express.Router();
const { postComment, editComment, deleteComment, likeComment } = require('../controllers/comment');
const {
  postMulti,
  editMulti,
  deleteMulti,
  getMulti,
  getIngMulti,
  getCompleteMulti,
  likeMulti,
  voteMulti,
  completeMulti,
  getTargetMulti,
} = require('../controllers/multi');
const {
  editChildComment,
  postChildComment,
  deleteChildComment,
  likeChildComment,
} = require('../controllers/child-comment');
const { authForGuest, auth } = require('../middlewares/auth');

router.get('/', authForGuest, getMulti); // 객관식 게시글 메인화면
router.get('/ing', authForGuest, getIngMulti); // 객관식 진행중 게시글
router.get('/complete', authForGuest, getCompleteMulti); // 객관식 종료된 게시글
router.get('/:multi_id/target', authForGuest, getTargetMulti); // 객관식 상세 페이지 뷰
router.post('/', auth, postMulti); // 객관식 게시글 작성
router.patch('/:multi_id', auth, editMulti); // 객관식 게시글 수정
router.delete('/:multi_id', auth, deleteMulti); // 객관식 게시글 삭제
router.post('/:multi_id/likes', auth, likeMulti); // 객관식 게시글 좋아요

router.post('/:multi_id/votes', auth, voteMulti); // 객관식 투표하기
router.patch('/:multi_id/complete', auth, completeMulti); // 투표 종료하기

router.post('/:multi_id/comment', auth, postComment); // 댓글 작성
router.patch('/:multi_id/comment/:comment_id/edit', auth, editComment); // 댓글 수정
router.patch('/:multi_id/comment/:comment_id/delete', auth, deleteComment); // 댓글 삭제
router.post('/:multi_id/comment/:comment_id/likes', auth, likeComment); // 댓글 좋아요

router.post('/:multi_id/comment/:comment_id', auth, postChildComment); // 대댓글 작성
router.patch('/:multi_id/childComment/:comment_id/edit', auth, editChildComment); // 대댓글 수정
router.patch('/:multi_id/childComment/:comment_id/delete', auth, deleteChildComment); // 대댓글 삭제
router.post('/:multi_id/childComment/:comment_id/likes', auth, likeChildComment); // 대댓글 좋아요

module.exports = router;
