import * as express from 'express';
import eitherControllers from '../controllers/either';

const router = express.Router();
const { authForGuest, auth } = require('../middlewares/auth');

router.get('/:either_id', authForGuest, eitherControllers.getEither); //찬반투표 뷰
router.get('/:either_id/ing', authForGuest, eitherControllers.getIngEither); //찬반투표 진행중 뷰
router.get('/:either_id/complete', authForGuest, eitherControllers.getCompleteEither); //찬반투표 투표종료 뷰
router.get('/:either_id/target', authForGuest, eitherControllers.getTargetEither); // 찬반투표 특정페이지 뷰

router.post('/', auth, eitherControllers.postEither); //찬반투표 게시글 작성
router.patch('/:either_id/edit', auth, eitherControllers.editEither); //찬반투표 게시글 수정
router.delete('/:either_id', auth, eitherControllers.deleteEither); //찬반투표 게시글 삭제

router.post('/:either_id/votes', auth, eitherControllers.voteEither); // 찬반 투표
router.patch('/:either_id/complete', auth, eitherControllers.completeEither); // 찬반 투표 종료
router.post('/:either_id/likes', auth, eitherControllers.likeEither); // 찬반투표 좋아요

export default router;