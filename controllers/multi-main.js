const { Sequelize, Op } = require('sequelize');
const Vote = require('../models/votes');
const Like = require('../models/likes');
const Multi = require('../models/multi');
const Comment = require('../models/comments');

exports.mainMulti = async (req, res, next) => {
  try {
    const user = 1;
    // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
    const multi = await Multi.findAll({
      attributes: [
        'multiId', 'user', 'title', 'description',
        'date', 'editedDate', 'completed', 'likeCnt',
        //[Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCnt'],
      ],
      include: [
        {
          model: Comment,
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'commentCnt']],
          separate: true,
        },
        {
          model: Vote,
          where: { user },
          attributes: [['vote', 'voted']],
          separate: true,
        },
        {
          model: Like,
          where: { user },
          attributes: [['user', 'liked']],
          separate: true,
        },
      ],
      separate: true,
      order: [['date', 'DESC']],
    });
    res.json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};