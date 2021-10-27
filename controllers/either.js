const { Either, sequelize } = require('../models/');
const { eitherSchema } = require('./joi');

// 게시글 작성에 대한 기능
exports.postEither = async (req, res, next) => {
  try {
    const { title, contentA, contentB, date } = await eitherSchema.validateAsync(req.body);
    const user = res.locals.user;
    await Either.create({
      user,
      title,
      contentA,
      contentB,
      date,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('양자택일 작성 시 에러발생', err);
    next(err);
  }
};

exports.getEither = async (req, res, next) => {
  try {
    const user = 1; // res.locals.user 로 수정하기
    const query = `SELECT *, (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
                  (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
                  (SELECT nickname FROM users WHERE id = either.user) AS nickname,
                  (SELECT user FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
                  FROM either ORDER BY eitherId DESC;`;
    const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json({
      success: true,
      either,
    });
  } catch (err) {
    console.log('글 받아올 때 에러발생', err);
    next(err);
  }
};

exports.getIngEither = async (req, res, next) => {
  try {
    const user = 1; // res.locals.user 로 수정하기
    const query = `SELECT *, (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
                  (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
                  (SELECT nickname FROM users WHERE id = either.user) AS nickname,
                  (SELECT user FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
                  FROM either WHERE completed = 0 ORDER BY eitherId DESC;`;
    const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json({
      success: true,
      either,
    });
  } catch (err) {
    console.log('글 받아올 때 에러발생', err);
    next(err);
  }
};

exports.getCompleteEither = async (req, res, next) => {
  try {
    const user = 1; // res.locals.user 로 수정하기
    const query = `SELECT *, (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
                  (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
                  (SELECT nickname FROM users WHERE id = either.user) AS nickname,
                  (SELECT user FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
                  FROM either WHERE completed = 1 ORDER BY eitherId DESC;`;
    const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json({
      success: true,
      either,
    });
  } catch (err) {
    console.log('글 받아올 때 에러발생', err);
    next(err);
  }
};

exports.editEither = async (req, res, next) => {
  const { title, contentA, contentB, editDate } = req.body;
  const { either_id } = req.params;
  const user = res.locals.user;
  try {
    const eitherExist = await Either.findOne({ where: { eitherId: either_id, user } });
    if (eitherExist) {
      await Either.update(
        { title, contentA, contentB, editDate, edited: true },
        { where: { eitherId: either_id, user } }
      );
      return res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteEither = async (req, res, next) => {
  const { either_id } = req.params;
  const user = res.locals.user;
  try {
    const eitherExist = await Either.findOne({ where: { eitherId: either_id, user } });
    if (eitherExist) {
      await Either.destroy({ where: { eitherId: either_id, user } });
      return res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
