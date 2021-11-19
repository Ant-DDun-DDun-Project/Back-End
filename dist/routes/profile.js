"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const profile_1 = require("../controllers/profile");
const router = express.Router();
const auth_1 = require("../middlewares/auth");
router.get('/:user_id', auth_1.auth, profile_1.default.getProfile); //프로필 페이지 뷰
router.get('/:user_id/posts', auth_1.auth, profile_1.default.getMyPosts); //내가 쓴 글 뷰
router.get('/:user_id/polls', auth_1.auth, profile_1.default.getMyPolls); //내가 참여한 글 뷰
router.patch('/nick', auth_1.auth, profile_1.default.editNickname); //닉네임 변경
exports.default = router;
//# sourceMappingURL=profile.js.map