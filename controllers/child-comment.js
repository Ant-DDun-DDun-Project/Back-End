const { ChildComment } = require('../models');
const { postCommentSchema } = require('./joi');

module.exports = {
  postChildComment: async (req, res, next) => {
    try {
      const { comment, date } = postCommentSchema.validateAsync(req.body);
      const { multi_id, comment_id } = req.params;
      const user = res.locals.user;
      await ChildComment.create({
        user,
        multi: multi_id,
        parentComment: comment_id,
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
