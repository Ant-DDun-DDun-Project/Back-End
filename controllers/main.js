const { User, Either, Multi, Vote } = require('../models');
const { countPosting } = require('./utils/posting-count');
const { countAttend } = require('./utils/attend-count');

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
      limit: 10,
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
      limit: 10,
    });
    const postingNum = await countPosting();
    const attendNum = await countAttend();
    res.status(200).json({ either, multi, postingNum, attendNum });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
