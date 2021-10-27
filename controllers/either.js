const { Either, User, Vote } = require('../models/');
const { eitherSchema } = require('./joi');
const { Op, Sequelize } = require('sequelize');

// 게시글 작성에 대한 기능
exports.postEither = async (req, res, next) => {
  try {
    const { title, contentA, contentB, date } = await eitherSchema.validateAsync(req.body);
    const user = res.locals.user;
    await Either.create({
      user,
      title,
      contentA,
      contentB,
      date,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('양자택일 작성 시 에러발생', err);
    next(err);
  }
};

exports.getEither = async (req, res, next) => {
  // const voteCntA = await Vote.findAll({
  //   attributes: [[sequelize.fn('COUNT', 'vote'), 'A']],
  //   where: {
  //     either: {
  //       [Op.gte]: 1,
  //     },
  //     vote: 'A',
  //   },
  // });
  const either = await Either.findAll({
    include: [
      {
        model: User,
        attributes: ['nickname'],
      },
      {
        model: Vote,
        // attributes: [[Sequelize.fn('COUNT', Sequelize.col('vote')), 'A']],
      },
    ],
    order: [['eitherId', 'DESC']],
  });
  res.status(200).json({
    either,
  });
};
