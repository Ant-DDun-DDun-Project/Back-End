const { Sequelize } = require('sequelize');
const { Either, Multi, User, sequelize } = require('../models');
const { and, or, like, not } = Sequelize.Op;

module.exports = {
  // 검색기능
  searchPosts: async (req, res, next) => {
    try {
      let { keyword } = await req.query;
      keyword = keyword.trim(); // 좌우 공백 제거
      if (!keyword.length) {
        res.status(400).json({ success: false });
      }
      keyword = keyword.replace(/\s\s+/gi, ' ');

      const queryForEither = `SELECT eitherId, user, title, date, editedDate, completed, likeCnt FROM either 
                              WHERE title LIKE '%${keyword}%' ORDER BY eitherId DESC`;
      const either = await sequelize.query(queryForEither, {
        type: sequelize.QueryTypes.SELECT,
      });

      const queryForMulti = `SELECT multiId, user, title, date, editedDate, completed, likeCnt, 
                            (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                            (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId)) AS commentCnt 
                            FROM multi WHERE title LIKE '%${keyword}%'
                            OR description LIKE '%${keyword}%' ORDER BY multiId DESC`;
      const multi = await sequelize.query(queryForMulti, {
        type: sequelize.QueryTypes.SELECT,
      });
      const post = [...either, ...multi];
      const posts = post.sort((b, a) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
