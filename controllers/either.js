const { Either, sequelize, Like, Vote } = require('../models/');
const { eitherSchema, editEitherSchema, voteEitherSchema } = require('./joi');

module.exports = {
  // 찬반투표 게시글 작성
  postEither: async (req, res, next) => {
    try {
      const { title, contentA, contentB, date } = await eitherSchema.validateAsync(req.body);
      const user = 1;
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
  },
  // 찬반투표 게시글 뷰
  getEither: async (req, res, next) => {
    try {
      const user = 1; // res.locals.user 로 수정하기
      const query = `SELECT *,
                            (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
                            (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
                            (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
                            (SELECT nickname FROM users WHERE id = either.user)                        AS nickname,
                            (SELECT user FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
                     FROM either
                     ORDER BY eitherId DESC;`;
      const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json({
        success: true,
        either,
      });
    } catch (err) {
      console.log('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 진행중 게시글 뷰
  getIngEither: async (req, res, next) => {
    try {
      const user = 1; // res.locals.user 로 수정하기
      const query = `SELECT *,
                            (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
                            (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
                            (SELECT nickname FROM users WHERE id = either.user)                        AS nickname,
                            (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
                            (SELECT user FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
                     FROM either
                     WHERE completed = 0
                     ORDER BY eitherId DESC;`;
      const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json({
        success: true,
        either,
      });
    } catch (err) {
      console.log('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 투표종료 게시글 뷰
  getCompleteEither: async (req, res, next) => {
    try {
      const user = 1; // res.locals.user 로 수정하기
      const query = `SELECT *,
                            (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
                            (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
                            (SELECT nickname FROM users WHERE id = either.user)                        AS nickname,
                            (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
                            (SELECT user FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
                     FROM either
                     WHERE completed = 1
                     ORDER BY eitherId DESC;`;
      const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json({
        success: true,
        either,
      });
    } catch (err) {
      console.log('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 게시글 수정
  editEither: async (req, res, next) => {
    const { title, contentA, contentB, editDate } = await editEitherSchema.validateAsync(req.body);
    const { either_id } = req.params;
    const user = 20;
    try {
      const eitherExist = await Either.findOne({ where: { eitherId: either_id, user } });
      if (eitherExist) {
        await Either.update(
          { title, contentA, contentB, editDate, edited: true },
          { where: { eitherId: either_id, user } }
        );
        return res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //찬반투표 게시글 삭제
  deleteEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = 20;
    try {
      const eitherExist = await Either.findOne({ where: { eitherId: either_id, user } });
      if (eitherExist) {
        await Either.destroy({ where: { eitherId: either_id, user } });
        return res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 찬반투표 게시글 좋아요
  likeEither: async (req, res, next) => {
    const { either_id } = req.params;
    // const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현시 삭제
    const user = 1;
    try {
      if (!(await Like.findOne({ where: { either: either_id, user } }))) {
        await Like.create({
          user,
          either: either_id,
        });
        const totalLike = await Like.count({ where: { either: either_id } });
        await Either.update({ likeCnt: totalLike }, { where: { eitherId: either_id } });
        res.status(200).json({
          success: true,
          likeCnt: totalLike,
        });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 찬반 투표
  voteEither: async (req, res, next) => {
    try {
      const { vote } = await voteEitherSchema.validateAsync(req.body);
      const { either_id } = req.params;
      // const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 3;

      if (await Vote.findOne({ where: { user, either: either_id } })) {
        // 이미 투표한 이력이 존재하는 경우
        res.status(400).json({ success: false });
      } else {
        await Vote.create({ user, vote, either: either_id }); // 투표한 이력없을 경우 투표 실시
        const voteCntA = await Vote.count({ where: { vote: 'A', either: either_id } }); // 현재 게시물에 대한 A 수
        const voteCntB = await Vote.count({ where: { vote: 'B', either: either_id } }); // 현재 게시물에 대한 B 수
        res.status(200).json({
          success: true,
          voteCntA,
          voteCntB,
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 찬반 투표 종료하기
  completeEither: async (req, res, next) => {
    const { either_id } = req.params;
    // const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
    const user = 9;

    try {
      if (await Either.findOne({ where: { user, eitherId: either_id, completed: false } })) {
        // DB에 해당 게시물이 존재하는 경우
        await Either.update({ completed: true }, { where: { user, eitherId: either_id } });
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 찬반 투표 특정페이지 뷰
  getTargetEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = 1;
    try {
      let query = `
        SELECT eitherId, either.user, title, contentA, contentB, date, edited, editedDate, likeCnt, 
          (SELECT (SELECT COUNT(*) FROM votes WHERE vote = 'A'))  AS voteCntA,
          (SELECT (SELECT COUNT(*) FROM votes WHERE vote = 'B'))  AS voteCntB,
          (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
          (SELECT user FROM votes WHERE votes.user = ${user} AND either = either.eitherId) AS voted
        FROM either
        WHERE eitherId = ${either_id};
      `;
      const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json({ success: true, either });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
