const { sequelize, Multi } = require('../models');
const { multiSchema, editMultiSchema } = require('./joi');

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
  // 객관식 게시글 작성에 대한 기능
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
};
