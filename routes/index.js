const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const multiRouter = require('./multi');

router.use('/posts/multi', multiRouter);
router.use('/users', userRouter);

module.exports = router;
