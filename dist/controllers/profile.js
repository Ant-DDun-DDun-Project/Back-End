"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../models/query");
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const joi_1 = require("./joi");
const profileQuery = new query_1.ProfileQuery();
class profileController {
    constructor() {
        //내가 쓴 글
        this.getMyPosts = async (req, res, next) => {
            try {
                const { user_id } = req.params; //req.params로 user의 고유id를 받아온다
                const [either, multi] = await Promise.all([
                    //Promise.all로 내가 쓴 글을 병렬로 찾아와서 변수로 저장한다.
                    models_1.Either.findAll({
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
                        raw: true,
                        where: { user: user_id },
                    }),
                    models_1.sequelize.query(profileQuery.getMyPosts(user_id), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }),
                ]);
                const post = [...either, ...multi]; //찬반 포스팅과 객관식 포스팅이 한배열안에 담기게 함
                const posts = post.sort((b, a) => {
                    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
                });
                res.status(200).json({ success: true, posts }); //status code는 200, success:true, 정렬된 포스팅을 보내준다.
            }
            catch (err) {
                next(err);
            }
        };
        //내가 참여한 글
        this.getMyPolls = async (req, res, next) => {
            try {
                const { user_id } = req.params; //req.params로 해당 user의 고유 id를 받아온다
                const [either, multi] = await Promise.all([
                    //Promise.all 내가 참여한 글을 병렬로 찾아와서 변수로 저장한다.
                    models_1.sequelize.query(profileQuery.getMyPollsForEither(user_id), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }),
                    models_1.sequelize.query(profileQuery.getMyPollsForMulti(user_id), {
                        type: sequelize_1.QueryTypes.SELECT,
                    }),
                ]);
                const post = [...either, ...multi]; //찬반 포스팅과 객관식 포스팅이 한배열안에 담기게 함
                const posts = post.sort((b, a) => {
                    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; //최신순 정렬
                });
                res.status(200).json({ success: true, posts }); //status code는 200, success: true, 정렬된 포스팅을 보내준다.
            }
            catch (err) {
                next(err);
            }
        };
        //닉네임 변경
        this.editNickname = async (req, res, next) => {
            try {
                const { nickname } = await joi_1.default.editNickSchema.validateAsync(req.body); //req.body로 바꿀 닉네임을 받는다
                const user = res.locals.user; //현재 로그인한 user의 고유id
                const NickExist = await models_1.User.findOne({ where: { id: user } }); //DB에서 해당 고유 id를 가진 user를 찾는다
                if (NickExist) {
                    //user가 있으면
                    await models_1.User.update({ nickname }, { where: { id: user } }); //닉네임을 변경한다
                    res.status(200).json({
                        success: true,
                        nickname,
                    }); //status code는 200, success:true와 닉네임을 보내준다.
                }
                else {
                    //user가 없으면
                    res.status(400).json({ success: false }); //status code는 400, success:false를 보내준다
                }
            }
            catch (err) {
                next(err);
            }
        };
        //프로필페이지 뷰
        this.getProfile = async (req, res, next) => {
            try {
                const { user_id } = req.params; //req.params로 해당 user의 고유id를 받아온다
                const user = await models_1.User.findOne({ where: { id: user_id } }); //고유 id로 user를 찾는다
                if (user) {
                    //user가 있으면
                    const nickname = user.nickname; //해당 user의 닉네임
                    res.status(200).json({ success: true, nickname }); //status code는 200, success: true와 닉네임을 보내준다.
                }
                else {
                    //user가 없으면
                    res.status(400).json({ success: false }); //status code는 400, success: false를 보내준다.
                }
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = new profileController();
//# sourceMappingURL=profile.js.map