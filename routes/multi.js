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
  getTargetMulti
} = require('../controllers/multi');
const {
  editChildComment,
  postChildComment,
  deleteChildComment,
  likeChildComment,
} = require('../controllers/child-comment');

router.get('/', getMulti); // 객관식 게시글 메인화면
router.get('/ing', getIngMulti); // 객관식 진행중 게시글
router.get('/complete', getCompleteMulti); // 객관식 종료된 게시글
router.get('/:multi_id/target', getTargetMulti) // 객관식 상세 페이지 뷰
router.post('/', postMulti); // 객관식 게시글 작성
router.patch('/:multi_id', editMulti); // 객관식 게시글 수정
router.delete('/:multi_id', deleteMulti); // 객관식 게시글 삭제
router.post('/:multi_id/likes', likeMulti); // 객관식 게시글 좋아요

router.post('/:multi_id/votes', voteMulti); // 객관식 투표하기
router.patch('/:multi_id/complete', completeMulti); // 투표 종료하기

router.post('/:multi_id/comment', postComment); // 댓글 작성
router.patch('/:multi_id/comment/:comment_id/edit', editComment); // 댓글 수정
router.patch('/:multi_id/comment/:comment_id/delete', deleteComment); // 댓글 삭제
router.post('/:multi_id/comment/:comment_id/likes', likeComment); // 댓글 좋아요

router.post('/:multi_id/comment/:comment_id', postChildComment); // 대댓글 작성
router.patch('/:multi_id/childComment/:comment_id/edit', editChildComment); // 대댓글 수정
router.patch('/:multi_id/childComment/:comment_id/delete', deleteChildComment); // 대댓글 삭제
router.post('/:multi_id/childComment/:comment_id/likes', likeChildComment); // 대댓글 좋아요

module.exports = router;
