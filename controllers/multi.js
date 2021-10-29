const { sequelize, Multi, Like, Vote } = require('../models');
const { multiSchema, editMultiSchema, voteMultiSchema } = require('./joi');

module.exports = {
  //객관식 페이지 메인뷰
  getMulti: async (req, res, next) => {
    try {
      const user = 1; // Todo --> 사용자 인증 미들웨어 구현 시 삭제
      // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const query = `SELECT *,
                            (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
                            (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
                            (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                                    (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
                            (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickanme
                     FROM multi
                     ORDER BY date DESC`;
      const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }); // QueryType 로 1번만 뽑는다.

      res.status(200).json({ success: 'true', multi });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //객관식 페이지 진행중 뷰
  getIngMulti: async (req, res, next) => {
    try {
      const user = 1; // Todo --> 사용자 인증 미들웨어 구현 시 삭제
      // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const query = `SELECT *,
                            (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
                            (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
                            (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                                    (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
                            (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickanme
                     FROM multi
                     WHERE completed = 0
                     ORDER BY date DESC`;
      const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }); // QueryType 로 1번만 뽑는다.
      res.status(200).json({ success: 'true', multi });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //객관식 페이지 투표종료 뷰
  getCompleteMulti: async (req, res, next) => {
    try {
      const user = 1; // Todo --> 사용자 인증 미들웨어 구현 시 삭제
      // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const query = `SELECT *,
                            (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
                            (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
                            (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                                    (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
                            (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickanme
                     FROM multi
                     WHERE completed = 1
                     ORDER BY date DESC`;
      const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }); // QueryType 로 1번만 뽑는다.
      res.status(200).json({ success: 'true', multi });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  // 객관식 상세페이지 뷰
  getTargetMulti: async (req, res, next) => {
    try {
      const { multi_id } = req.params;
      // const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 1;
      const multiQuery = `SELECT *,
                                 (SELECT (SELECT COUNT(*) FROM comments WHERE multi = ${multi_id}) +
                                         (SELECT COUNT(*) FROM childcomments WHERE multi = ${multi_id})) AS commentCnt,
                                 (SELECT COUNT(*) FROM likes WHERE multi = ${multi_id})                  AS likeCnt,
                                 (SELECT vote FROM votes WHERE multi = ${multi_id})                      AS voted,
                                 (SELECT user FROM likes WHERE user = ${user} AND multi = ${multi_id})   AS liked,
                                 (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'A')   AS voteCntA,
                                 (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'B')   AS voteCntB,
                                 (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'C')   AS voteCntC,
                                 (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'D')   AS voteCntD,
                                 (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'E')   AS voteCntE
                          FROM multi
                          WHERE multiId = ${multi_id}`;

      const commentQuery = `SELECT *,
                                   (SELECT COUNT(*)
                                    FROM commentlikes
                                    WHERE commentlikes.comment = comments.id)            AS CommentLikeCnt,
                                   (SELECT user
                                    FROM commentlikes
                                    WHERE user = ${user}
                                      AND commentlikes.comment = comments.id)            AS liked,
                                   (SELECT nickname FROM users WHERE id = comments.user) AS nickname
                            FROM comments
                            WHERE multi = ${multi_id}
                            ORDER BY date`;

      const childCommentQuery = `SELECT *,
                                        (SELECT COUNT(*)
                                         FROM commentlikes
                                         WHERE commentlikes.childComment = childcomments.id)       AS commentLikeCnt,
                                        (SELECT nickname FROM users WHERE id = childcomments.user) AS nickname,
                                        (SELECT user
                                         FROM commentlikes
                                         WHERE user = ${user}
                                           AND commentlikes.childComment = childcomments.id)       AS liked
                                 FROM childcomments
                                 WHERE multi = ${multi_id}
                                 ORDER BY date`;
      const multi = await sequelize.query(multiQuery, { type: sequelize.QueryTypes.SELECT });
      const comment = await sequelize.query(commentQuery, { type: sequelize.QueryTypes.SELECT });
      const childComment = await sequelize.query(childCommentQuery, { type: sequelize.QueryTypes.SELECT });
      res.status(200).json({ success: true, multi: multi[0], comment, childComment });
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
      // const user = res.locals.user;
      const user = 20;
      const alreadyVote = await Vote.findOne({ where: { user, multi: multi_id } });
      if (alreadyVote) {
        res.status(400).json({ success: false });
      } else {
        await Vote.create({ user, vote: select, multi: multi_id });
        const voteCntA = await Vote.count({ where: { vote: 'A', multi: multi_id } });
        const voteCntB = await Vote.count({ where: { vote: 'B', multi: multi_id } });
        const voteCntC = await Vote.count({ where: { vote: 'C', multi: multi_id } });
        const voteCntD = await Vote.count({ where: { vote: 'D', multi: multi_id } });
        const voteCntE = await Vote.count({ where: { vote: 'E', multi: multi_id } });
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
      // const user = res.locals.user;
      const user = 20;
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
