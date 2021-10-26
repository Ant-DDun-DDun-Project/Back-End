const { User, Either, Multi, Vote } = require('../models');
const sequelize = require('sequelize');

exports.main = async (req, res, next) => {
  try {
    const either = await Either.findAll({
      attributes: ['eitherId', 'title', 'likeCnt'],
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      order: [['likeCnt', 'DESC']],
    });
    const multi = await Multi.findAll({
      attributes: ['multiId', 'title', 'description', 'likeCnt'],
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      order: [['likeCnt', 'DESC']],
    });
    const eitherNum = await Either.count({});
    const multiNum = await Multi.count({});
    const postingNum = eitherNum + multiNum;
    //COUNT, DISTINCT
    // const votes = await Vote.findAll({})
  } catch (err) {
    console.error(err);
    next(err);
  }
};
