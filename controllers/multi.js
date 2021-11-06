const { sequelize, Multi, Like, Vote } = require('../models');
const { multiSchema, editMultiSchema, voteMultiSchema } = require('./joi');
const { sortMulti } = require('./utils/sort-posts');
const { countVote } = require('./utils/vote-count');
const { MultiQuery } = require('../models/query');
const multiQuery = new MultiQuery();

module.exports = {
  //객관식 페이지 메인뷰
  getMulti: async (req, res, next) => {
    const { multi_id } = req.params;
    console.log(multi_id);
    if (multi_id === 'undefined') {
      try {
        const user = res.locals.user;
        const multi = await sequelize.query(multiQuery.getMulti(user), {
          type: sequelize.QueryTypes.SELECT,
        }); // QueryType 로 1번만 뽑는다.
        res.status(200).json({ success: true, multi });
      } catch (err) {
        console.error(err);
        next(err);
      }
    } else {
      try {
        const user = res.locals.user;
        const unsortedMulti = await sequelize.query(multiQuery.getMulti(user), {
          type: sequelize.QueryTypes.SELECT,
        });
        // console.log(unsortedMulti);
        const multi = sortMulti(unsortedMulti, multi_id);
        res.status(200).json({ success: true, multi });
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  },
  //객관식 페이지 진행중 뷰
  getIngMulti: async (req, res, next) => {
    const { multi_id } = req.params;
    if (multi_id === 'undefined') {
      try {
        const user = res.locals.user;
        const multi = await sequelize.query(multiQuery.getIngMulti(user), {
          type: sequelize.QueryTypes.SELECT,
        }); // QueryType 로 1번만 뽑는다.
        res.status(200).json({ success: true, multi });
      } catch (err) {
        console.error(err);
        next(err);
      }
    } else {
      try {
        const user = res.locals.user;
        const unsortedMulti = await sequelize.query(multiQuery.getIngMulti(user), {
          type: sequelize.QueryTypes.SELECT,
        }); // QueryType 로 1번만 뽑는다.
        const multi = sortMulti(unsortedMulti, multi_id);
        res.status(200).json({ success: true, multi });
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  },
  //객관식 페이지 투표종료 뷰
  getCompleteMulti: async (req, res, next) => {
    const { multi_id } = req.params;
    if (multi_id === 'undefined') {
      try {
        const user = res.locals.user;
        const multi = await sequelize.query(multiQuery.getCompleteMulti(user), {
          type: sequelize.QueryTypes.SELECT,
        }); // QueryType 로 1번만 뽑는다.
        res.status(200).json({ success: true, multi });
      } catch (err) {
        console.error(err);
        next(err);
      }
    } else {
      try {
        const user = res.locals.user;
        const unsortedMulti = await sequelize.query(multiQuery.getCompleteMulti(user), {
          type: sequelize.QueryTypes.SELECT,
        }); // QueryType 로 1번만 뽑는다.
        console.log(unsortedMulti);
        const multi = sortMulti(unsortedMulti, multi_id);
        res.status(200).json({ success: true, multi });
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  },
  // 객관식 상세페이지 뷰
  getTargetMulti: async (req, res, next) => {
    try {
      const { multi_id } = req.params;
      const user = res.locals.user;
      const multi = await sequelize.query(multiQuery.getTargetMulti(user, multi_id), {
        type: sequelize.QueryTypes.SELECT,
      });
      if (multi.length > 0) {
        // 객관식 게시글이 존재하지 하는 경우
        const comment = await sequelize.query(multiQuery.getComment(user, multi_id), {
          type: sequelize.QueryTypes.SELECT,
        });
        const childComment = await sequelize.query(multiQuery.getChildComment(user, multi_id), {
          type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json({ success: true, multi: multi[0], comment, childComment });
      } else {
        // 객관식 상세 페이지가 존재하지 않는 경우
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  // 객관식 게시글 작성
  postMulti: async (req, res, next) => {
    try {
      const { title, description, contentA, contentB, contentC, contentD, contentE, date } =
        await multiSchema.validateAsync(req.body); // Joi Schema 검증 절차
      const user = res.locals.user; // 로그인한 유저는 user 아이디를 갖는다.
      // 객관식 게시물 DB 저장
      await Multi.create({
        user,
        title,
        description,
        contentA,
        contentB,
        contentC,
        contentD,
        contentE,
        date,
      });
      res.status(200).json({ success: true }); // 게시글 작성 성공시 { success: true } 전송
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //객관식 게시글 수정
  editMulti: async (req, res, next) => {
    try {
      const { multi_id } = req.params;
      const { title, description, contentA, contentB, contentC, contentD, contentE, editedDate } =
        await editMultiSchema.validateAsync(req.body);
      await Multi.update(
        {
          title,
          description,
          contentA,
          contentB,
          contentC,
          contentD,
          contentE,
          editedDate,
          edited: 1,
        },
        {
          where: { multiId: multi_id },
        }
      );
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //객관식 게시글 삭제
  deleteMulti: async (req, res, next) => {
    try {
      const { multi_id } = req.params;
      const user = res.locals.user;
      const multiExist = await Multi.findOne({ where: { multiId: multi_id, user } });
      if (multiExist) {
        await Multi.destroy({ where: { multiId: multi_id, user } });
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(400).json({
          success: false,
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //객관식 게시글 좋아요
  likeMulti: async (req, res, next) => {
    try {
      const { multi_id } = req.params;
      const user = res.locals.user;
      const alreadyLike = await Like.findOne({ where: { multi: multi_id, user } });
      if (alreadyLike) {
        res.status(400).json({
          success: false,
        });
      } else {
        await Like.create({
          user,
          multi: multi_id,
        });
        const likeCnt = await Like.count({
          where: {
            multi: multi_id,
          },
        });
        await Multi.update({ likeCnt }, { where: { multiId: multi_id } });
        res.status(200).json({
          success: true,
          likeCnt,
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //객관식 투표하기
  voteMulti: async (req, res, next) => {
    try {
      const { select } = await voteMultiSchema.validateAsync(req.body);
      const { multi_id } = req.params;
      const user = res.locals.user;
      const alreadyVote = await Vote.findOne({ where: { user, multi: multi_id } });
      if (alreadyVote) {
        res.status(400).json({ success: false });
      } else {
        await Vote.create({ user, vote: select, multi: multi_id });
        const totalVote = await Vote.findAll({ where: { multi: multi_id }, raw: true });
        [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE] = await countVote(totalVote);
        res.status(200).json({
          success: true,
          voteCntA,
          voteCntB,
          voteCntC,
          voteCntD,
          voteCntE,
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  // 객관식 게시글 종료하기
  completeMulti: async (req, res, next) => {
    try {
      const { multi_id } = req.params;
      const user = res.locals.user;
      const myMulti = await Multi.findOne({ where: { user, multiId: multi_id, completed: false } });
      if (myMulti) {
        await Multi.update({ completed: true }, { where: { user, multiId: multi_id } });
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
