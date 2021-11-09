const { sequelize } = require('../models');
const { MainQuery } = require('../models/query');
const { countPosting } = require('./utils/posting-count');
const { countAttend } = require('./utils/attend-count');
const mainQuery = new MainQuery();

module.exports = {
  getMain: async (req, res, next) => {
    try {
      const [either, multi, [eitherNum, multiNum], attendNum] = await Promise.all([
        sequelize.query(mainQuery.getMainForEither(), { type: sequelize.QueryTypes.SELECT }),
        sequelize.query(mainQuery.getMainForMulti(), { type: sequelize.QueryTypes.SELECT }),
        countPosting(),
        countAttend(),
      ]);
      const postingNum = eitherNum + multiNum;
      res.status(200).json({
        success: true,
        either,
        multi,
        postingNum,
        multiNum,
        eitherNum,
        attendNum,
      });
    } catch (err) {
      next(err);
    }
  },
};
