const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const eitherRouter = require('./either');
const multiRouter = require('./multi');

router.use('/posts/multi', multiRouter);
router.use('/users', userRouter);
router.use('/posts/either', eitherRouter);

module.exports = router;