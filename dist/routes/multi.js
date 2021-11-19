"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multi_1 = require("../controllers/multi");
const comment_1 = require("../controllers/comment");
const child_comment_1 = require("../controllers/child-comment");
const router = express.Router();
const { authForGuest, auth } = require('../middlewares/auth');
router.get('/:multi_id', authForGuest, multi_1.default.getMulti); // 객관식 게시글 메인화면
router.get('/:multi_id/ing', authForGuest, multi_1.default.getIngMulti); // 객관식 진행중 게시글
router.get('/:multi_id/complete', authForGuest, multi_1.default.getCompleteMulti); // 객관식 종료된 게시글
router.get('/:multi_id/target', authForGuest, multi_1.default.getTargetMulti); // 객관식 상세 페이지 뷰
router.post('/', auth, multi_1.default.postMulti); // 객관식 게시글 작성
router.post('/:multi_id/likes', auth, multi_1.default.likeMulti); // 객관식 게시글 좋아요
router.patch('/:multi_id', auth, multi_1.default.editMulti); // 객관식 게시글 수정
router.delete('/:multi_id', auth, multi_1.default.deleteMulti); // 객관식 게시글 삭제
router.post('/:multi_id/votes', auth, multi_1.default.voteMulti); // 객관식 투표하기
router.patch('/:multi_id/complete', auth, multi_1.default.completeMulti); // 투표 종료하기
router.post('/:multi_id/comment', auth, comment_1.default.postComment); // 댓글 작성
router.post('/:multi_id/comment/:comment_id/likes', auth, comment_1.default.likeComment); // 댓글 좋아요
router.patch('/:multi_id/comment/:comment_id/edit', auth, comment_1.default.editComment); // 댓글 수정
router.patch('/:multi_id/comment/:comment_id/delete', auth, comment_1.default.deleteComment); // 댓글 삭제
router.post('/:multi_id/comment/:comment_id', auth, child_comment_1.default.postChildComment); // 대댓글 작성
router.post('/:multi_id/childComment/:comment_id/likes', auth, child_comment_1.default.likeChildComment); // 대댓글 좋아요
router.patch('/:multi_id/childComment/:comment_id/edit', auth, child_comment_1.default.editChildComment); // 대댓글 수정
router.patch('/:multi_id/childComment/:comment_id/delete', auth, child_comment_1.default.deleteChildComment); // 대댓글 삭제
exports.default = router;
//# sourceMappingURL=multi.js.map