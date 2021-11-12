const { Either, sequelize, Like, Vote } = require('../models/');
const { eitherSchema, editEitherSchema, voteEitherSchema } = require('./joi');
const { EitherQuery } = require('../models/query');
const { sortEither } = require('./utils/sort-posts');
const eitherQuery = new EitherQuery();

module.exports = {
  // 찬반투표 게시글 작성
  postEither: async (req, res, next) => {
    try {
      const { title, contentA, contentB, date } = await eitherSchema.validateAsync(req.body); //req.body로 찬반투표 데이터들(제목, 선택지, 날짜)를 받아옴
      const user = res.locals.user; //현재 로그인한 user의 고유id
      await Either.create({
        user,
        title,
        contentA,
        contentB,
        date,
      }); //찬반투표 데이터 생성
      res.status(200).json({ success: true }); //status code 200, success:true를 보내준다
    } catch (err) {
      next(err);
    }
  },
  // 찬반투표 게시글 뷰
  getEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //req.params로 찬반투표 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (either_id === 'all') {
        //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
        const either = await sequelize.query(eitherQuery.getEither(user), {
          type: sequelize.QueryTypes.SELECT,
        }); //찬반투표 전체 게시물
        res.status(200).json({
          success: true,
          either,
        }); //status code 200, success:true, 찬반투표 전체 게시물을 보내준다.
      } else {
        //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
        const unsortedEither = await sequelize.query(eitherQuery.getEither(user), {
          type: sequelize.QueryTypes.SELECT,
        }); //전체 게시물
        const either = sortEither(unsortedEither, either_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
        res.status(200).json({
          success: true,
          either,
        }); //status code 200, success:true, 찬반투표 게시물 데이터를 보내준다.
      }
    } catch (err) {
      console.error('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 진행중 게시글 뷰
  getIngEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //req.params로 찬반투표 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (either_id === 'all') {
        //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
        const either = await sequelize.query(eitherQuery.getIngEither(user), {
          type: sequelize.QueryTypes.SELECT,
        }); //찬반투표 진행중 게시물
        res.status(200).json({
          success: true,
          either,
        }); //status code 200, success:true, 찬반투표 진행중 게시물을 보내준다.
      } else {
        //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
        const unsortedEither = await sequelize.query(eitherQuery.getIngEither(user), {
          type: sequelize.QueryTypes.SELECT,
        }); //찬반투표 진행중 게시물
        const either = sortEither(unsortedEither, either_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
        res.status(200).json({
          success: true,
          either,
        }); //status code 200, success:true, 찬반투표 진행중 게시물 데이터를 보내준다.
      }
    } catch (err) {
      console.error('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 투표종료 게시글 뷰
  getCompleteEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //req.params로 찬반투표 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (either_id === 'all') {
        //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
        const either = await sequelize.query(eitherQuery.getCompleteEither(user), {
          type: sequelize.QueryTypes.SELECT,
        }); //찬반투표 종료 게시물
        res.status(200).json({
          success: true,
          either,
        }); //status code 200, success:true, 찬반투표 종료 게시물을 보내준다.
      } else {
        //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
        const unsortedEither = await sequelize.query(eitherQuery.getCompleteEither(user), {
          type: sequelize.QueryTypes.SELECT,
        }); //찬반투표 종료 게시물
        const either = sortEither(unsortedEither, either_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
        res.status(200).json({
          success: true,
          either,
        }); //status code 200, success:true, 찬반투표 종료 게시물 데이터를 보내준다.
      }
    } catch (err) {
      console.error('글 받아올 때 에러발생', err);
      next(err);
    }
  },
  //찬반투표 게시글 수정
  editEither: async (req, res, next) => {
    try {
      const { title, contentA, contentB, editDate } = await editEitherSchema.validateAsync(
        req.body
      ); //req.body로 찬반투표 게시물 수정할 데이터(제목, 선택지, 수정날짜)를 받아온다
      const { either_id } = req.params; //해당 게시물의 고유 id
      const user = res.locals.user; //현재 로그인한 user의 고유id
      const userCheck = await Either.findOne({ where: { eitherId: either_id, user } }); //현재 로그인한 user가 작성한 포스팅인지
      if (userCheck) {
        //작성자가 맞으면
        await Either.update(
          { title, contentA, contentB, editDate, edited: true },
          { where: { eitherId: either_id, user } }
        ); //게시물 수정
        return res.status(200).json({ success: true }); //status code 200, success:true를 보내준다.
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  },
  //찬반투표 게시글 삭제
  deleteEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //해당 게시물의 고유id
      const user = res.locals.user; //현재 로그인한 user의 고유id
      const userCheck = await Either.findOne({ where: { eitherId: either_id, user } }); //현재 로그인한 user가 작성한 포스팅인지
      if (userCheck) {
        //작성자가 맞으면
        await Either.destroy({ where: { eitherId: either_id, user } }); //해당 게시물 삭제
        return res.status(200).json({ success: true }); //status code 200, success:true를 보내준다
      } else {
        //작성자가 아니면
        res.status(400).json({ success: false }); //status code 400, success:false
      }
    } catch (err) {
      next(err);
    }
  },

  // 찬반투표 게시글 좋아요
  likeEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //해당 게시물의 고유id
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (!(await Like.findOne({ where: { either: either_id, user } }))) {
        //해당 게시물에 좋아요를 한적이 없으면
        await Like.create({
          user,
          either: either_id,
        }); //좋아요 기록생성
        const totalLike = await Like.count({ where: { either: either_id } }); //해당 게시물의 좋아요 수
        await Either.update({ likeCnt: totalLike }, { where: { eitherId: either_id } }); //해당 게시물의 좋아요 수 update
        res.status(200).json({
          success: true,
          likeCnt: totalLike,
        }); //status code 200, success:true, 좋아요 수를 보내준다
      } else {
        //좋아요를 이미 했으면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  },

  // 찬반 투표
  voteEither: async (req, res, next) => {
    try {
      const { vote } = await voteEitherSchema.validateAsync(req.body); //req.body로 선택지를 받아옴
      const { either_id } = req.params; //req.params로 해당 게시물의 고유id를 받아옴
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (await Vote.findOne({ where: { user, either: either_id } })) {
        //이미 투표한 기록이 존재하는 경우
        await Vote.update({ vote }, { where: { either: either_id, user } }); //투표 이력 수정
      } else {
        //투표한 기록이 없으면
        await Vote.create({ user, vote, either: either_id }); //투표 기록 생성
      }
      const [voteCntA, voteCntB] = await Promise.all([
        //Promise.all로 각각 선택지에 투표한 사람의 수를 변수로 지정
        Vote.count({ where: { vote: 'A', either: either_id } }),
        Vote.count({ where: { vote: 'B', either: either_id } }),
      ]);
      res.status(200).json({
        success: true,
        either: Number(either_id),
        voteCntA,
        voteCntB,
        vote,
      }); //status code 200, success:true, 해당 찬반투표의 고유id, 선택한 선택지, 투표수를 보내준다.
    } catch (err) {
      next(err);
    }
  },

  // 찬반 투표 종료하기
  completeEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //req.params로 해당 게시물의 고유id를 받아옴
      const user = res.locals.user; //현재 로그인한 user의 고유id
      if (await Either.findOne({ where: { user, eitherId: either_id, completed: false } })) {
        //DB에 해당 게시물이 존재하는 경우
        await Either.update({ completed: true }, { where: { user, eitherId: either_id } }); //종료됨으로 변경
        res.status(200).json({ success: true }); //status code 200, success:true를 보내줌
      } else {
        //해당 게시물이 없으면
        res.status(400).json({ success: false }); //status code 400, success:false를 보내줌
      }
    } catch (err) {
      next(err);
    }
  },

  // 찬반 투표 특정페이지 뷰
  getTargetEither: async (req, res, next) => {
    try {
      const { either_id } = req.params; //req.params로 해당 게시물의 고유id를 받아옴
      const user = res.locals.user; //현재 로그인한 user의 고유id
      const either = await sequelize.query(eitherQuery.getTargetEither(user, either_id), {
        type: sequelize.QueryTypes.SELECT,
      }); //해당 게시물 데이터
      res.status(200).json({ success: true, either }); //status code 200, success:true, 해당 게시물 데이터를 보내줌
    } catch (err) {
      next(err);
    }
  },
};
