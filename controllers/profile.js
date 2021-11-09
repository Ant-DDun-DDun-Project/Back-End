const { sequelize, Either, User } = require('../models');
const { ProfileQuery } = require('../models/query');
const { editNickSchema } = require('./joi');
const profileQuery = new ProfileQuery();

module.exports = {
  //내가 쓴 글
  getMyPosts: async (req, res, next) => {
    const { user_id } = req.params;
    try {
      const [either, multi] = await Promise.all([
        Either.findAll({
          attributes: [
            'eitherId',
            'user',
            'title',
            'date',
            'edited',
            'editedDate',
            'completed',
            'likeCnt',
          ],
          where: { user: user_id },
        }),
        sequelize.query(profileQuery.getMyPosts(user_id), {
          type: sequelize.QueryTypes.SELECT,
        }),
      ]);
      const post = [...either, ...multi]; //either + multi
      const posts = post.sort((b, a) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
      });
      res.status(200).json({ success: true, posts });
    } catch (err) {
      next(err);
    }
  },
  //내가 참여한 글
  getMyPolls: async (req, res, next) => {
    const { user_id } = req.params;
    try {
      const [either, multi] = await Promise.all([
        sequelize.query(profileQuery.getMyPollsForEither(user_id), {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(profileQuery.getMyPollsForMulti(user_id), {
          type: sequelize.QueryTypes.SELECT,
        }),
      ]);
      const post = [...either, ...multi]; //either + multi
      const posts = post.sort((b, a) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
      });
      res.status(200).json({ success: true, posts });
    } catch (err) {
      next(err);
    }
  },
  //닉네임 변경
  editNickname: async (req, res, next) => {
    try {
      const { nickname } = await editNickSchema.validateAsync(req.body);
      const user = res.locals.user;
      const NickExist = await User.findOne({ where: { id: user } });
      if (NickExist) {
        await User.update({ nickname }, { where: { id: user } });
        res.status(200).json({
          success: true,
          nickname,
        });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      next(err);
    }
  },
  //프로필페이지 뷰
  getProfile: async (req, res, next) => {
    const { user_id } = req.params;
    try {
      const user = await User.findOne({ where: { id: user_id } });
      if (user) {
        const nickname = user.nickname;
        res.status(200).json({ success: true, nickname });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      next(err);
    }
  },
};
