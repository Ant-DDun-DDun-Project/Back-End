const { sequelize } = require('../models');
const { SearchQuery } = require('../models/query');
const searchQuery = new SearchQuery();

module.exports = {
  // 검색기능
  searchPosts: async (req, res, next) => {
    try {
      const { keyword } = req.query;
      const keywords = keyword.trim().replace(/\s\s+/gi, ' ').split(' '); //공백 제거
      if (!keyword.length) {
        res.status(400).json({ success: false });
      }
      const searchedPosts = [];
      for (let word of keywords) {
        const [searchedEither, searchedMulti] = await Promise.all([
          sequelize.query(searchQuery.searchEither(word), {
            type: sequelize.QueryTypes.SELECT,
          }),
          sequelize.query(searchQuery.searchMulti(word), {
            type: sequelize.QueryTypes.SELECT,
          }),
        ]);
        searchedPosts.push([...searchedEither, ...searchedMulti]);
      }
      const posts = searchedPosts.flat().sort((b, a) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      }); //다차원 배열을 1차원 배열로 만든 후 날짜순으로 정렬
      res.status(200).json({ success: true, posts });
    } catch (err) {
      next(err);
    }
  },
};
