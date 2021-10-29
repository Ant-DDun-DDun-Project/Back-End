const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const eitherRouter = require('./either');
const multiRouter = require('./multi');
const mainRouter = require('./main');
const profileRouter = require('./profile');
const searchRouter = require('./search');

router.use('/', mainRouter);
router.use('/search', searchRouter);
router.use('/profiles', profileRouter);
router.use('/posts/multi', multiRouter);
router.use('/users', userRouter);
router.use('/posts/either', eitherRouter);

module.exports = router;
