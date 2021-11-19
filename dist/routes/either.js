"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const either_1 = require("../controllers/either");
const router = express.Router();
const { authForGuest, auth } = require('../middlewares/auth');
router.get('/:either_id', authForGuest, either_1.default.getEither); //찬반투표 뷰
router.get('/:either_id/ing', authForGuest, either_1.default.getIngEither); //찬반투표 진행중 뷰
router.get('/:either_id/complete', authForGuest, either_1.default.getCompleteEither); //찬반투표 투표종료 뷰
router.get('/:either_id/target', authForGuest, either_1.default.getTargetEither); // 찬반투표 특정페이지 뷰
router.post('/', auth, either_1.default.postEither); //찬반투표 게시글 작성
router.patch('/:either_id/edit', auth, either_1.default.editEither); //찬반투표 게시글 수정
router.delete('/:either_id', auth, either_1.default.deleteEither); //찬반투표 게시글 삭제
router.post('/:either_id/votes', auth, either_1.default.voteEither); // 찬반 투표
router.patch('/:either_id/complete', auth, either_1.default.completeEither); // 찬반 투표 종료
router.post('/:either_id/likes', auth, either_1.default.likeEither); // 찬반투표 좋아요
exports.default = router;
//# sourceMappingURL=either.js.map