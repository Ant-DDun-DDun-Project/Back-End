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
      const attendNum = await countAttend();
      res.status(200).json({ success: true, either, multi, postingNum, attendNum });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
