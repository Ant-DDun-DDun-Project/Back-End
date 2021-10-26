const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const multiRouter = require('./multi');

router.use('/users', userRouter);
router.use('/posts/multi', multiRouter);

module.exports = router;
