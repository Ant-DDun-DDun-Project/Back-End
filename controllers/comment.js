const { Comment } = require('../models');
const { postCommentSchema, editCommentSchema } = require('./joi');

module.exports = {
  postComment: async (req, res, next) => {
    try {
      const { comment, date } = postCommentSchema.validateAsync(req.body);
      const { multi_id } = req.params;
      const user = res.locals.user;
      await Comment.create({
        user,
        multi: multi_id,
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
  // 댓글 수정 기능
  editComment: async (req, res, next) => {
    try {
      console.log(req.body);
      const { comment, editedDate } = req.body; // Todo --> 조이 확인
      const { multi_id, comment_id } = req.params;
      //const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 1; // Todo --> 사용자 인증 미들웨어 구현 시 삭제
      console.log(comment, editedDate);
      await Comment.update({
        comment, editedDate, edited: true,
      }, { where: { user, multi: multi_id, id: comment_id } });
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  // 댓글 삭제 기능
  deleteComment: async (req, res, next) => {
    try {
      const { multi_id, comment_id } = req.params;
      // const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 1;

      await Comment.update({
        deleted: true
      }, { where: { user, multi: multi_id, id: comment_id } });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
