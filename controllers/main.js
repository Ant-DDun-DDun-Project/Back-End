const { User, Either, Multi } = require('../models');
const { countPosting } = require('./utils/posting-count');
const { countAttend } = require('./utils/attend-count');

exports.getMain = async (req, res, next) => {
  try {
    const either = await Either.findAll({
      attributes: ['eitherId', 'title', 'likeCnt', 'date'],
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
      attributes: ['multiId', 'title', 'description', 'likeCnt', 'date'],
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
    res.status(200).json({ success: true, either, multi, postingNum, attendNum });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
