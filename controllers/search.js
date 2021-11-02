const { Sequelize } = require('sequelize');
const { sequelize } = require('../models');
const { SearchQuery } = require('../models/query');
const searchQuery = new SearchQuery();

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

      const either = await sequelize.query(searchQuery.searchEither(keyword), {
        type: sequelize.QueryTypes.SELECT,
      });

      const multi = await sequelize.query(searchQuery.searchMulti(keyword), {
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
