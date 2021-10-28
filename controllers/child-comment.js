const { ChildComment } = require('../models');
const { postCommentSchema, editCommentSchema } = require('./joi');

module.exports = {
  //대댓글 작성
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
  //대댓글 수정
  editChildComment: async (req, res, next) => {
    const { comment, editedDate } = editCommentSchema.validateAsync(req.body);
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
  // 대댓글 삭제
  deleteChildComment: async (req, res, next) => {
    try {
      const { multi_id, comment_id } = req.params;
      // const user = res.locals.user // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 1; // Todo --> 사용자 인증 미들웨어 구현 시 삭제

      if (await ChildComment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
        await ChildComment.update(
          { deleted: true },
          { where: { user, multi: multi_id, id: comment_id } }
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
