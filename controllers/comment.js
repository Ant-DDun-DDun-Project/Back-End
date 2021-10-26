const { Comment } = require('../models');
const { postCommentSchema } = require('./joi');
module.exports = {
  postComment: async (req, res, next) => {
    try {
      const { comment, date } = postCommentSchema.validateAsync(req.body);
      const { multi_id } = req.params;
      const user = res.locals.user;
      await Comment.create({
        user,
        multi_id,
        comment,
        date,
      });
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
