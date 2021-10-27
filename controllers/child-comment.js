const { ChildComment } = require('../models');
const { postCommentSchema } = require('./joi');

module.exports = {
  postChildComment: async (req, res, next) => {
    try {
      const { comment, date } = await postCommentSchema.validateAsync(req.body);
      const { multi_id, comment_id } = req.params;
      const user = 1;
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
  editChildComment: async (req, res, next) => {
    const { comment, editedDate } = req.body;
    const { multi_id, comment_id } = req.params;
    const user = res.locals.user;
    try {
      const childExist = await ChildComment.findOne({
        where: { multi: multi_id, id: comment_id, user },
      });
      if (childExist) {
        await ChildComment.update(
          { comment, editedDate },
          { where: { multi: multi_id, id: comment_id, user } }
        );
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
