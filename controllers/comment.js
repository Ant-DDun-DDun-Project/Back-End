const { Comment } = require('../models');

module.exports = {
  postComment: async (req, res, next) => {
    const { comment, date } = req.body;
    const { multi_id } = req.params;
  },
};
