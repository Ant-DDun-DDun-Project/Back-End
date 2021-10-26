const express = require('express');
const router = express.Router();
const { postMulti } = require('../controllers/multi-post');

router.post('/', postMulti);  // 객관식 게시글 작성

module.exports = router;