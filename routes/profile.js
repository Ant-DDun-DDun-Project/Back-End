const express = require('express');
const router = express.Router();
const { getMyPosts, getMyPolls, editNickname, getProfile } = require('../controllers/profile');
const { auth } = require('../middlewares/auth');

router.get('/:user_id', auth, getProfile); //프로필 페이지 뷰
router.get('/:user_id/posts', auth, getMyPosts); //내가 쓴 글 뷰
router.get('/:user_id/polls', auth, getMyPolls); //내가 참여한 글 뷰
router.patch('/nick', auth, editNickname); //닉네임 변경

module.exports = router;
