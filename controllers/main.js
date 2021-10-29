const { sequelize } = require('../models');
const { countPosting } = require('./utils/posting-count');
const { countAttend } = require('./utils/attend-count');

module.exports = {
  getMain: async (req, res, next) => {
    try {
      let query = `
        SELECT eitherId, title, likeCnt, date,
          (SELECT nickname FROM users WHERE users.id = either.user)  AS nickname
        FROM either
        ORDER BY likeCnt DESC
        LIMIT 10;
      `;
      const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      query = `
        SELECT multiId, title, description, likeCnt, date,
          (SELECT nickname FROM users WHERE users.id = multi.user)  AS nickname,
          (SELECT 
            (SELECT COUNT(*) FROM comments 
            WHERE multi = multi.multiId) +
            (SELECT COUNT(*) FROM childcomments 
            WHERE multi = multi.multiId))  AS commentCnt
        FROM multi
        ORDER BY likeCnt DESC
        LIMIT 10;
      `;
      const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      const postingNum = await countPosting();
      const attendNum = await countAttend();
      res.status(200).json({ success: true, either, multi, postingNum, attendNum });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
