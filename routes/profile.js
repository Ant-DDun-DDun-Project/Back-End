const express = require('express');
const router = express.Router();
const { getMyPosts, getMyPolls } = require('../controllers/porfile');

router.get('/:user_id/posts', getMyPosts);
router.get('/:user_id/polls', getMyPolls);

module.exports = router;
