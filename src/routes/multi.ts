import * as express from 'express';
import multiControllers from '../controllers/multi';
import commentControllers from '../controllers/comment';
import childCommentControllers from '../controllers/child-comment';

const router = express.Router();
const { authForGuest, auth } = require('../middlewares/auth');

router.get('/:multi_id', authForGuest, multiControllers.getMulti); // 객관식 게시글 메인화면
router.get('/:multi_id/ing', authForGuest, multiControllers.getIngMulti); // 객관식 진행중 게시글
router.get('/:multi_id/complete', authForGuest, multiControllers.getCompleteMulti); // 객관식 종료된 게시글
router.get('/:multi_id/target', authForGuest, multiControllers.getTargetMulti); // 객관식 상세 페이지 뷰

router.post('/', auth, multiControllers.postMulti); // 객관식 게시글 작성
router.post('/:multi_id/likes', auth, multiControllers.likeMulti); // 객관식 게시글 좋아요
router.patch('/:multi_id', auth, multiControllers.editMulti); // 객관식 게시글 수정
router.delete('/:multi_id', auth, multiControllers.deleteMulti); // 객관식 게시글 삭제
router.post('/:multi_id/votes', auth, multiControllers.voteMulti); // 객관식 투표하기
router.patch('/:multi_id/complete', auth, multiControllers.completeMulti); // 투표 종료하기

router.post('/:multi_id/comment', auth, commentControllers.postComment); // 댓글 작성
router.post('/:multi_id/comment/:comment_id/likes', auth, commentControllers.likeComment); // 댓글 좋아요
router.patch('/:multi_id/comment/:comment_id/edit', auth, commentControllers.editComment); // 댓글 수정
router.patch('/:multi_id/comment/:comment_id/delete', auth, commentControllers.deleteComment); // 댓글 삭제

router.post('/:multi_id/comment/:comment_id', auth, childCommentControllers.postChildComment); // 대댓글 작성
router.post(
  '/:multi_id/childComment/:comment_id/likes',
  auth,
  childCommentControllers.likeChildComment
); // 대댓글 좋아요
router.patch(
  '/:multi_id/childComment/:comment_id/edit',
  auth,
  childCommentControllers.editChildComment
); // 대댓글 수정
router.patch(
  '/:multi_id/childComment/:comment_id/delete',
  auth,
  childCommentControllers.deleteChildComment
); // 대댓글 삭제

export default router;
