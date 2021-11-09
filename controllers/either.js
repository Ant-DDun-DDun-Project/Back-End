const { Either, sequelize, Like, Vote } = require('../models/');
const { eitherSchema, editEitherSchema, voteEitherSchema } = require('./joi');
const { EitherQuery } = require('../models/query');
const { sortEither } = require('./utils/sort-posts');
const eitherQuery = new EitherQuery();

module.exports = {
  // 찬반투표 게시글 작성
  postEither: async (req, res, next) => {
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
  },
  // 찬반투표 게시글 뷰
  getEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
    try {
      if (either_id === 'all') {
        const either = await sequelize.query(eitherQuery.getEither(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json({
          success: true,
          either,
        });
      } else {
        const unsortedEither = await sequelize.query(eitherQuery.getEither(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        const either = sortEither(unsortedEither, either_id);
        res.status(200).json({
          success: true,
          either,
        });
      }
    } catch (err) {
      console.error('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 진행중 게시글 뷰
  getIngEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
    try {
      if (either_id === 'all') {
        const either = await sequelize.query(eitherQuery.getIngEither(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json({
          success: true,
          either,
        });
      } else {
        const unsortedEither = await sequelize.query(eitherQuery.getIngEither(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        const either = sortEither(unsortedEither, either_id);
        res.status(200).json({
          success: true,
          either,
        });
      }
    } catch (err) {
      console.error('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 투표종료 게시글 뷰
  getCompleteEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
    try {
      if (either_id === 'all') {
        const either = await sequelize.query(eitherQuery.getCompleteEither(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json({
          success: true,
          either,
        });
      } else {
        const unsortedEither = await sequelize.query(eitherQuery.getCompleteEither(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        const either = sortEither(unsortedEither, either_id);
        res.status(200).json({
          success: true,
          either,
        });
      }
    } catch (err) {
      console.error('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 게시글 수정
  editEither: async (req, res, next) => {
    const { title, contentA, contentB, editDate } = await editEitherSchema.validateAsync(req.body);
    const { either_id } = req.params;
    const user = res.locals.user;
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
      next(err);
    }
  },
  //찬반투표 게시글 삭제
  deleteEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
    try {
      const eitherExist = await Either.findOne({ where: { eitherId: either_id, user } });
      if (eitherExist) {
        await Either.destroy({ where: { eitherId: either_id, user } });
        return res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      next(err);
    }
  },

  // 찬반투표 게시글 좋아요
  likeEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
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
      next(err);
    }
  },

  // 찬반 투표
  voteEither: async (req, res, next) => {
    try {
      const { vote } = await voteEitherSchema.validateAsync(req.body);
      const { either_id } = req.params;
      const user = res.locals.user;
      if (await Vote.findOne({ where: { user, either: either_id } })) {
        // 이미 투표한 이력이 존재하는 경우
        await Vote.update({ vote }, { where: { either: either_id, user } });
      } else {
        await Vote.create({ user, vote, either: either_id }); // 투표한 이력없을 경우 투표 실시
      }
      const [voteCntA, voteCntB] = await Promise.all([
        Vote.count({ where: { vote: 'A', either: either_id } }),
        Vote.count({ where: { vote: 'B', either: either_id } }),
      ]); // 현재 게시물에 대한 A,B 수
      res.status(200).json({
        success: true,
        either: Number(either_id),
        voteCntA,
        voteCntB,
        vote,
      });
    } catch (err) {
      next(err);
    }
  },

  // 찬반 투표 종료하기
  completeEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
    try {
      if (await Either.findOne({ where: { user, eitherId: either_id, completed: false } })) {
        // DB에 해당 게시물이 존재하는 경우
        await Either.update({ completed: true }, { where: { user, eitherId: either_id } });
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      next(err);
    }
  },

  // 찬반 투표 특정페이지 뷰
  getTargetEither: async (req, res, next) => {
    const { either_id } = req.params;
    const user = res.locals.user;
    try {
      const either = await sequelize.query(eitherQuery.getTargetEither(user, either_id), {
        type: sequelize.QueryTypes.SELECT,
      });
      res.status(200).json({ success: true, either });
    } catch (err) {
      next(err);
    }
  },
};
