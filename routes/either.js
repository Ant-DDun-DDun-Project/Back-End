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
} = require('../controllers/either');

router.get('/', getEither); //찬반투표 뷰
router.get('/ing', getIngEither); //찬반투표 진행중 뷰
router.get('/complete', getCompleteEither); //찬반투표 투표종료 뷰

router.post('/', postEither); //찬반투표 게시글 작성
router.patch('/:either_id/edit', editEither); //찬반투표 게시글 수정
router.delete('/:either_id', deleteEither); //찬반투표 게시글 삭제

router.post('/:either_id/votes', voteEither);
router.post('/:either_id/likes', likeEither); // 찬반투표 좋아요
module.exports = router;
