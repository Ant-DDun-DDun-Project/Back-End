const express = require('express');
const router = express.Router();
const {
  getEither,
  getIngEither,
  getCompleteEither,
  postEither,
  editEither,
  deleteEither,
  likeEither,
  voteEither,
  completeEither,
  getTargetEither,
} = require('../controllers/either');
const { authForGuest, auth } = require('../middlewares/auth');

router.get('/:either_id', authForGuest, getEither); //찬반투표 뷰
router.get('/:either_id/ing', authForGuest, getIngEither); //찬반투표 진행중 뷰
router.get('/:either_id/complete', authForGuest, getCompleteEither); //찬반투표 투표종료 뷰
router.get('/:either_id/target', authForGuest, getTargetEither); // 찬반투표 특정페이지 뷰

router.post('/', auth, postEither); //찬반투표 게시글 작성
router.patch('/:either_id/edit', auth, editEither); //찬반투표 게시글 수정
router.delete('/:either_id', auth, deleteEither); //찬반투표 게시글 삭제

router.post('/:either_id/votes', auth, voteEither); // 찬반 투표
router.patch('/:either_id/complete', auth, completeEither); // 찬반 투표 종료
router.post('/:either_id/likes', auth, likeEither); // 찬반투표 좋아요
module.exports = router;
