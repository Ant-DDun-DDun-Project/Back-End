const { Sequelize } = require('sequelize');
const { Vote, Like, Multi, Comment } = require('../models');

exports.getMulti = async (req, res, next) => {
  try {
    const user = 3;                // Todo --> 사용자 인증 미들웨어 구현 시 삭제
    // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
    const multi = await Multi.findAll({
      attributes: [
        'multiId', 'user', 'title', 'description',
        'date', 'editedDate', 'completed', 'likeCnt',
      ],
      include: [
        { // 현재 작성글에 대한 Comment 의 전체 개수
          model: Comment,
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'commentCnt']],
          separate: true, // 여러 join 에 대해서 각각의 Query 문을 실행한다.
        },
        { // 현재 작성글에 대한 Vote 를 로그인한 유저가 했는지 안했는지에 대한 확인
          model: Vote,
          where: { user },
          attributes: [['vote', 'voted']],
          separate: true,
        },
        { // 현재 작성글에 대한 Like 를 로그인한 유저가 했는지 안했는지에 대한 확인
          model: Like,
          where: { user },
          attributes: [['user', 'liked']],
          separate: true,
        },
      ],
      order: [['date', 'DESC']],  // 최신 날짜 순으로 정렬
    });
    res.status(200).json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getIngMulti = async (req, res, next) => {
  try {
    const user = 13;                // Todo --> 사용자 인증 미들웨어 구현 시 삭제
    // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
    const multi = await Multi.findAll({
      where: { completed: false },
      attributes: [
        'multiId', 'user', 'title', 'description',
        'date', 'editedDate', 'completed', 'likeCnt',
      ],
      include: [
        { // 현재 작성글에 대한 Comment 의 전체 개수
          model: Comment,
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'commentCnt']],
          separate: true, // 여러 join 에 대해서 각각의 Query 문을 실행한다.
        },
        { // 현재 작성글에 대한 Vote 를 로그인한 유저가 했는지 안했는지에 대한 확인
          model: Vote,
          where: { user },
          attributes: [['vote', 'voted']],
          separate: true,
        },
        { // 현재 작성글에 대한 Like 를 로그인한 유저가 했는지 안했는지에 대한 확인
          model: Like,
          attributes: [['user', 'liked']],
          separate: true,
        },
      ],

      order: [['date', 'DESC']],  // 최신 날짜 순으로 정렬
    });
    res.status(200).json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getCompleteMulti = async (req, res, next) => {
  try {
    const user = 3;                // Todo --> 사용자 인증 미들웨어 구현 시 삭제
    // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
    const multi = await Multi.findAll({
      where: { completed: true },
      attributes: [
        'multiId', 'user', 'title', 'description',
        'date', 'editedDate', 'completed', 'likeCnt',
      ],
      include: [
        { // 현재 작성글에 대한 Comment 의 전체 개수
          model: Comment,
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'commentCnt']],
          separate: true, // 여러 join 에 대해서 각각의 Query 문을 실행한다.
        },
        { // 현재 작성글에 대한 Vote 를 로그인한 유저가 했는지 안했는지에 대한 확인
          model: Vote,
          where: { user },
          attributes: [['vote', 'voted']],
          separate: true,
        },
        { // 현재 작성글에 대한 Like 를 로그인한 유저가 했는지 안했는지에 대한 확인
          model: Like,
          where: { user },
          attributes: [['user', 'liked']],
          separate: true,
        },
      ],
      order: [['date', 'DESC']],  // 최신 날짜 순으로 정렬
    });
    res.status(200).json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};