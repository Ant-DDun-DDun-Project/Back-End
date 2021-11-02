const express = require('express');
const router = express.Router();
const { getMyPosts, getMyPolls, editNickname, getProfile } = require('../controllers/porfile');
const { auth } = require('../middlewares/auth');

router.get('/:user_id/posts', auth, getMyPosts);
router.get('/:user_id/polls', auth, getMyPolls);
router.patch('/nick', auth, editNickname);
router.get('/:user_id', auth, getProfile);

module.exports = router;
