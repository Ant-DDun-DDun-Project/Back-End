const { Comment } = require('../models');
const { postCommentSchema, editCommentSchema } = require('./joi');

module.exports = {
  //댓글 작성
  postComment: async (req, res, next) => {
    try {
      const { comment, date } = await postCommentSchema.validateAsync(req.body);
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
  // 댓글 수정
  editComment: async (req, res, next) => {
    try {
      const { comment, editedDate } = await editCommentSchema.validateAsync(req.body); // Todo --> 조이 확인
      const { multi_id, comment_id } = req.params;
      //const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 1; // Todo --> 사용자 인증 미들웨어 구현 시 삭제

      if (await Comment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
        await Comment.update(
          {
            comment,
            editedDate,
            edited: true,
          },
          { where: { user, multi: multi_id, id: comment_id } }
        );
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(400).json({
          success: false,
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  // 댓글 삭제
  deleteComment: async (req, res, next) => {
    try {
      const { multi_id, comment_id } = req.params;
      // const user = res.locals.user; // Todo --> 사용자 인증 미들웨어 구현 시 활성화
      const user = 1;
      console.log(req.params);
      if (await Comment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
        await Comment.update(
          {
            deleted: true,
          },
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
