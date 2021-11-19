"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const joi_1 = require("./joi");
const sort_posts_1 = require("./utils/sort-posts");
const vote_count_1 = require("./utils/vote-count");
const query_1 = require("../models/query");
const multiQuery = new query_1.MultiQuery();
class multiControllers {
    constructor() {
        //객관식 페이지 메인뷰
        this.getMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 객관식 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
                const user = res.locals.user; //현재 로그인한 user의 고유id
                if (multi_id === 'all') {
                    //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
                    const multi = await models_1.sequelize.query(multiQuery.getMulti(user), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }); //객관식 포스팅을 가져옴
                    res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다
                }
                else {
                    //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
                    const unsortedMulti = await models_1.sequelize.query(multiQuery.getMulti(user), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }); //객관식 포스팅을 가져옴
                    const multi = (0, sort_posts_1.sortMulti)(unsortedMulti, multi_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
                    res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다.
                }
            }
            catch (err) {
                next(err);
            }
        };
        //객관식 페이지 진행중 뷰
        this.getIngMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 객관식 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
                const user = res.locals.user; //현재 로그인한 user의 고유id
                if (multi_id === 'all') {
                    //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
                    const multi = await models_1.sequelize.query(multiQuery.getIngMulti(user), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }); //객관식 포스팅을 가져옴
                    res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다
                }
                else {
                    //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
                    const unsortedMulti = await models_1.sequelize.query(multiQuery.getIngMulti(user), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }); //객관식 포스팅을 가져옴
                    const multi = (0, sort_posts_1.sortMulti)(unsortedMulti, multi_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
                    res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다.
                }
            }
            catch (err) {
                next(err);
            }
        };
        //객관식 페이지 투표종료 뷰
        this.getCompleteMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 객관식 포스팅의 고유 id를 받아온다, 상세페이지나 특정페이지를 본 경우에는 해당 고유 id가 오고 아닐시 all이라는 문자로 온다.
                const user = res.locals.user; //현재 로그인한 user의 고유id
                if (multi_id === 'all') {
                    //뒤로가기나 해당 게시물 클릭을 통해서 main view로 온 것이 아닐때
                    const multi = await models_1.sequelize.query(multiQuery.getCompleteMulti(user), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }); //객관식 포스팅을 가져옴
                    res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다
                }
                else {
                    //상세페이지나 특정페이지를 보고난 후 main view로 갔을때
                    const unsortedMulti = await models_1.sequelize.query(multiQuery.getCompleteMulti(user), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }); //객관식 포스팅을 가져옴
                    const multi = (0, sort_posts_1.sortMulti)(unsortedMulti, multi_id); //해당 고유id를 가진 포스팅이 가장 먼저 오도록 정렬
                    res.status(200).json({ success: true, multi }); //status code 200, success:true, 객관식 포스팅을 보낸다.
                }
            }
            catch (err) {
                next(err);
            }
        };
        // 객관식 상세페이지 뷰
        this.getTargetMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 특정 객관식 포스팅
                const user = res.locals.user; //현재 로그인한 user의 고유id
                const multi = await models_1.sequelize.query(multiQuery.getTargetMulti(user, multi_id), {
                    type: sequelize_1.QueryTypes.SELECT,
                }); //특정 객관식 포스팅 데이터를 가져옴
                if (multi.length > 0) {
                    // 객관식 게시글이 존재하는 경우
                    const [comment, childComment] = await Promise.all([
                        //Promise.all로 댓글과, 대댓글을 변수로 저장함
                        models_1.sequelize.query(multiQuery.getComment(user, multi_id), {
                            type: sequelize_1.QueryTypes.SELECT,
                        }),
                        models_1.sequelize.query(multiQuery.getChildComment(user, multi_id), {
                            type: sequelize_1.QueryTypes.SELECT,
                        }),
                    ]);
                    res.status(200).json({ success: true, multi: multi[0], comment, childComment }); //status code 200, success:true, 객관식포스팅, 댓글, 대댓글 데이터를 보내준다.
                }
                else {
                    // 객관식 상세 페이지가 존재하지 않는 경우
                    res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
                }
            }
            catch (err) {
                next(err);
            }
        };
        // 객관식 게시글 작성
        this.postMulti = async (req, res, next) => {
            try {
                const { title, description, contentA, contentB, contentC, contentD, contentE, date, } = await joi_1.default.multiSchema.validateAsync(req.body); //req.body로 객관식 데이터(제목,내용, 선택지 A,B,C,D,E, 날짜)를 받아온다.
                const user = res.locals.user; //로그인한 유저는 user 아이디를 갖는다.
                await models_1.Multi.create({
                    user,
                    title,
                    description,
                    contentA,
                    contentB,
                    contentC,
                    contentD,
                    contentE,
                    date,
                }); // 객관식 게시물 DB 저장
                res.status(200).json({ success: true }); // 게시글 작성 성공시 { success: true } 전송
            }
            catch (err) {
                next(err);
            }
        };
        //객관식 게시글 수정
        this.editMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 해당 게시물 고유id를 받아옴
                const { title, description, contentA, contentB, contentC, contentD, contentE, editedDate, } = await joi_1.default.editMultiSchema.validateAsync(req.body); //req.body로 객관식 데이터(제목,내용, 선택지 A,B,C,D,E, 수정날짜)를 받아온다.
                await models_1.Multi.update({
                    title,
                    description,
                    contentA,
                    contentB,
                    contentC,
                    contentD,
                    contentE,
                    editedDate,
                    edited: true,
                }, {
                    where: { multiId: multi_id },
                }); //받아온 데이터로 업데이트를 해준다
                res.status(200).json({ success: true }); // status code 200, success:true를 보내준다
            }
            catch (err) {
                next(err);
            }
        };
        //객관식 게시글 삭제
        this.deleteMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 해당 게시물 고유id를 받아옴
                const user = res.locals.user; //현재 로그인한 user의 고유id
                const userCheck = await models_1.Multi.findOne({ where: { multiId: multi_id, user } }); //user가 해당 게시물을 작성했는지 확인
                if (userCheck) {
                    //작성자가 맞으면
                    await models_1.Multi.destroy({ where: { multiId: multi_id, user } }); //해당 게시물 삭제
                    res.status(200).json({ success: true }); //status code 200, success:true를 보내준다.
                }
                else {
                    //작성자가 아니면
                    res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
                }
            }
            catch (err) {
                next(err);
            }
        };
        //객관식 게시글 좋아요
        this.likeMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params;
                const user = res.locals.user;
                const alreadyLike = await models_1.Like.findOne({ where: { multi: multi_id, user } });
                if (alreadyLike) {
                    res.status(400).json({ success: false });
                }
                else {
                    await models_1.Like.create({ user, multi: multi_id });
                    const likeCnt = await models_1.Like.count({ where: { multi: multi_id } });
                    await models_1.Multi.update({ likeCnt }, { where: { multiId: multi_id } });
                    res.status(200).json({ success: true, likeCnt });
                }
            }
            catch (err) {
                next(err);
            }
        };
        //객관식 투표하기
        this.voteMulti = async (req, res, next) => {
            try {
                const { select } = await joi_1.default.voteMultiSchema.validateAsync(req.body); //req.body로 선택한 선택지를 받아옴
                const { multi_id } = req.params; //req.params로 해당 게시글의 고유id를 받아옴
                const user = res.locals.user; //현재 로그인한 유저의 고유id
                const alreadyVote = await models_1.Vote.findOne({ where: { user, multi: multi_id } }); //이미 투표했는지 확인
                if (alreadyVote) {
                    //이미 투표했으면
                    res.status(400).json({ success: false }); //status code 400, success:false를 보내줌
                }
                else {
                    //투표하지 않았으면
                    await models_1.Vote.create({ user, vote: select, multi: multi_id }); //투표기록을 남김
                    const totalVote = await models_1.Vote.findAll({
                        where: { multi: multi_id },
                        raw: true,
                    }); //해당 게시글의 총 투표수를 계산하기 위해 해당게시글에 해당하는 투표기록 가져옴
                    const [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE] = await (0, vote_count_1.countVote)(totalVote); //투표수를 count해서 각각 변수에 저장.
                    res.status(200).json({
                        success: true,
                        voteCntA,
                        voteCntB,
                        voteCntC,
                        voteCntD,
                        voteCntE,
                    }); //status code 200, success:true, 각각의 투표수를 보내준다
                }
            }
            catch (err) {
                next(err);
            }
        };
        // 객관식 게시글 종료하기
        this.completeMulti = async (req, res, next) => {
            try {
                const { multi_id } = req.params; //req.params로 해당 게시글의 고유id를 받아옴
                const user = res.locals.user; //현재 로그인한 user
                const userCheck = await models_1.Multi.findOne({
                    where: { user, multiId: multi_id, completed: false },
                }); //종료되지 않은 해당 게시글의 작성자 확인
                if (userCheck) {
                    //작성자가 맞으면
                    await models_1.Multi.update({ completed: true }, { where: { user, multiId: multi_id } }); //해당 게시글 수정
                    res.status(200).json({ success: true }); //status code 200, success:true를 보내준다
                }
                else {
                    //작성자가 아니면
                    res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
                }
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = new multiControllers();
//# sourceMappingURL=multi.js.map