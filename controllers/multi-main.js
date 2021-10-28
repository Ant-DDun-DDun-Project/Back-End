const { sequelize } = require('../models');

exports.getMulti = async (req, res, next) => {
  try {
    const user = 1;                // Todo --> 사용자 인증 미들웨어 구현 시 삭제
    // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
    const query = `SELECT *,
                          (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
                          (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
                          (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                                  (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
                          (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickanme
                   FROM multi
                   ORDER BY date DESC`;
    const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });  // QueryType 로 1번만 뽑는다.

    res.status(200).json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getIngMulti = async (req, res, next) => {
  try {
    const user = 1;                // Todo --> 사용자 인증 미들웨어 구현 시 삭제
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
    const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });  // QueryType 로 1번만 뽑는다.
    res.status(200).json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getCompleteMulti = async (req, res, next) => {
  try {
    const user = 1;                // Todo --> 사용자 인증 미들웨어 구현 시 삭제
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
    const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });  // QueryType 로 1번만 뽑는다.
    res.status(200).json({ success: 'true', multi });
  } catch (err) {
    console.error(err);
    next(err);
  }
};