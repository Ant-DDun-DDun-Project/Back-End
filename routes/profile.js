const express = require('express');
const router = express.Router();
const { getMyPosts, getMyPolls, editNickname } = require('../controllers/porfile');

router.get('/:user_id/posts', getMyPosts);
router.get('/:user_id/polls', getMyPolls);
router.patch('/nick', editNickname);

module.exports = router;
