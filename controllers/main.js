const { sequelize } = require('../models');
const { MainQuery } = require('../models/query');
const { countPosting } = require('./utils/posting-count');
const { countAttend } = require('./utils/attend-count');
const mainQuery = new MainQuery();

module.exports = {
  getMain: async (req, res, next) => {
    try {
      const either = await sequelize.query(mainQuery.getMainForEither(), {
        type: sequelize.QueryTypes.SELECT,
      });
      const multi = await sequelize.query(mainQuery.getMainForMulti(), {
        type: sequelize.QueryTypes.SELECT,
      });
      const postingNum = await countPosting();

      // 1. count를 쿼리로 대체

      // let query = `
      //   SELECT COUNT(*) AS eitherNum FROM either ;
      // `;
      // const eitherNum = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      // query = `SELECT COUNT(*) AS multiNum FROM multi;`;
      // const multiNum = await sequelize.query(query, { type: sequelize.QueryTypes.SEKECT });
      // const postingNum = eitherNum[0].eitherNum + multiNum[0][0].multiNum;
      // console.log(eitherNum, multiNum);
      // console.log(eitherNum[0].eitherNum, multiNum[0][0].multiNum, postingNum);

      // 2. 서브쿼리를 이용한 전체 포스팅 갯수

      // let query = `
      //   SELECT (SELECT(SELECT COUNT(*) FROM either)+
      //                 (SELECT COUNT(*) FROM multi )) AS postingNum
      //   FROM users
      //   where id = 1;
      // `;

      // 3. union all을 이용한 전체 포스팅 갯수

      // let query = `
      //   SELECT SUM(postingNum) AS postingNum FROM (
      //     SELECT COUNT(multiId) AS postingNum FROM multi
      //     UNION ALL
      //     SELECT COUNT(eitherId) AS postingNum FROM either
      //   ) a
      // `;

      // const posting = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      // const postingNum = posting[0].postingNum;

      const attendNum = await countAttend();
      res.status(200).json({ success: true, either, multi, postingNum, attendNum });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
