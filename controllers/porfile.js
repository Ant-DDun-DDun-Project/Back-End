const { sequelize, Either, User } = require('../models');

module.exports = {
  //내가 쓴 글
  getMyPosts: async (req, res, next) => {
    const { user_id } = req.params;
    try {
      const either = await Either.findAll({
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
      });
      const query = `
        SELECT multiId,user,title,date,editedDate,completed,likeCnt,
          (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId)+
                  (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))  AS commentCnt
        FROM multi;
      `;
      const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      const post = [...either, ...multi]; //either + multi
      const posts = post.sort((b, a) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
      });
      res.status(200).json({ success: true, posts });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //내가 참여한 글
  getMyPolls: async (req, res, next) => {
    const { user_id } = req.params;
    try {
      let query = `
      SELECT either AS eitherId, either.user,either.title,either.date, either.edited,either.editedDate, either.completed, either.likeCnt 
      FROM votes 
      INNER JOIN either ON votes.either = either.eitherId 
      WHERE votes.user=${user_id} AND either.eitherId= votes.either;
      `;
      const either = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      query = `
      SELECT multi AS multiId, multi.user,multi.title,multi.date, multi.edited,multi.editedDate, multi.completed, multi.likeCnt,
      (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
              (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))  AS commentCnt 
      FROM votes 
      INNER JOIN multi ON votes.multi = multi.multiId 
      WHERE votes.user=${user_id} AND multi.multiId= votes.multi;
      `;
      const multi = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      const post = [...either, ...multi]; //either + multi
      const posts = post.sort((b, a) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
      });
      res.status(200).json({ success: true, posts });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  //닉네임 변경
  editNickname: async (req, res, next) => {
    try {
      const { nickname } = req.body;
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
      console.error(err);
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
      console.error(err);
      next(err);
    }
  },
};
