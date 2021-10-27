const MultiPost = require('../models/multi');
const { multiSchema, editMultiSchema } = require('./joi');

// 게시글 작성에 대한 기능
exports.postMulti = async (req, res, next) => {
  try {
    const { title, description, contentA, contentB, contentC, contentD, contentE, date } =
      await multiSchema.validateAsync(req.body); // Joi Schema 검증 절차
    const user = res.locals.user; // 로그인한 유저는 user 아이디를 갖는다.

    // 객관식 게시물 DB 저장
    await MultiPost.create({
      user,
      title,
      description,
      contentA,
      contentB,
      contentC,
      contentD,
      contentE,
      date,
    });
    res.status(200).json({ success: true }); // 게시글 작성 성공시 { success: true } 전송
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.editMulti = async (req, res, next) => {
  try {
    const { multi_id } = req.params;
    const { title, description, contentA, contentB, contentC, contentD, contentE, editedDate } =
      await editMultiSchema.validateAsync(req.body);
    await MultiPost.update(
      {
        title,
        description,
        contentA,
        contentB,
        contentC,
        contentD,
        contentE,
        editedDate,
        edited: 1,
      },
      {
        where: { multiId: multi_id },
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteMulti = async (req, res, next) => {
  try {
    const { multi_id } = req.params;
    const user = res.locals.user;
    const multiExist = await MultiPost.findOne({ where: { multiId: multi_id, user } });
    if (multiExist) {
      await MultiPost.destroy({ where: { multiId: multi_id, user } });
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
};
