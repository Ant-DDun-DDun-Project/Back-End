"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childCommentControllers = void 0;
const models_1 = require("../models");
const joi_1 = require("./joi");
class childCommentControllers {
    //대댓글 작성
    async postChildComment(req, res, next) {
        try {
            const { comment, date } = await joi_1.default.postCommentSchema.validateAsync(req.body); //req.body로 대댓글 정보(내용, 작성날짜)를 받아온다.
            const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 댓글의 고유id를 받아온다
            const user = res.locals.user; //현재 로그인한 user의 고유id
            const [child, nickname] = await Promise.all([
                //Promise.all로 대댓글 생성, 작성자의 닉네임을 병렬적으로 수행한 후 각각 변수 지정
                models_1.ChildComment.create({
                    user,
                    multi: multi_id,
                    parentComment: comment_id,
                    comment,
                    date,
                }),
                models_1.User.findOne({
                    attributes: ['nickname'],
                    where: { id: user },
                    raw: true,
                }),
            ]);
            const childMent = await models_1.ChildComment.findOne({
                where: {
                    user,
                    multi: multi_id,
                    parentComment: comment_id,
                    comment,
                    date,
                }, raw: true
            });
            const childComment = Object.assign(nickname, childMent); //두 객체(닉네임, 대댓글)를 한객체로 병합
            res.status(200).json({
                success: true,
                childComment,
            }); //status code 200, success:true, 대댓글정보를 보내준다.
        }
        catch (err) {
            next(err);
        }
    }
    //대댓글 수정
    async editChildComment(req, res, next) {
        try {
            const { comment, editedDate } = await joi_1.default.editCommentSchema.validateAsync(req.body); //req.body로 대댓글 수정정보(수정내용, 수정날짜)를 받아온다.
            const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 대댓글의 고유id를 받아온다.
            const user = res.locals.user; //현재 로그인한 user의 고유id
            const userCheck = await models_1.ChildComment.findOne({
                where: { multi: multi_id, id: comment_id, user },
            }); //현재 로그인한 사람이 해당 대댓글의 작성자인지 확인
            if (userCheck) {
                //작성자가 맞으면
                await models_1.ChildComment.update({ comment, editedDate }, { where: { multi: Number(multi_id), id: Number(comment_id), user } }); //해당 대댓글 수정
                const [childMent, nickname] = await Promise.all([
                    //Promise.all로 수정한 댓글 정보와 로그인한 사람의 닉네임을 병렬적으로 찾아서 변수로 저장
                    models_1.ChildComment.findOne({
                        where: {
                            multi: multi_id,
                            id: comment_id,
                            user,
                        },
                        raw: true
                    }),
                    models_1.User.findOne({
                        attributes: ['nickname'],
                        where: { id: user },
                        raw: true,
                    }),
                ]);
                const childComment = Object.assign(nickname, childMent); //두 객체(닉네임, 대댓글 정보)를 한 객체로 합침
                res.status(200).json({
                    success: true,
                    childComment,
                }); //status code 200, success:true, 대댓글 정보를 보내준다.
            }
            else {
                //작성자가 아니면
                res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
            }
        }
        catch (err) {
            next(err);
        }
    }
    // 대댓글 삭제
    async deleteChildComment(req, res, next) {
        try {
            const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 해당 대댓글의 고유id를 받아온다.
            const user = res.locals.user; //현재 로그인한 user의 고유id
            if (await models_1.ChildComment.findOne({ where: { user, multi: multi_id, id: comment_id } })) {
                //현재 로그인한 user가 해당 대댓글의 작성자이면
                await models_1.ChildComment.update({ deleted: true }, { where: { user, multi: Number(multi_id), id: Number(comment_id) } }); //해당 대댓글의 삭제상태를 true로 변경
                const [childMent, nickname] = await Promise.all([
                    //Promise.all로 수정한 댓글 정보와 로그인한 사람의 닉네임을 병렬적으로 찾아서 변수로 저장
                    models_1.ChildComment.findOne({
                        where: {
                            multi: multi_id,
                            id: comment_id,
                            user,
                        }, raw: true
                    }),
                    models_1.User.findOne({
                        attributes: ['nickname'],
                        where: { id: user },
                        raw: true,
                    }),
                ]);
                const childComment = Object.assign(nickname, childMent); //두 객체(닉네임, 대댓글 정보)를 한 객체로 병합
                res.status(200).json({
                    success: true,
                    childComment,
                }); //status code 200, success:true, 대댓글 정보를 보내준다.
            }
            else {
                //작성자가 아니면
                res.status(400).json({ success: false }); //success:false를 보내준다.
            }
        }
        catch (err) {
            next(err);
        }
    }
    //대댓글 좋아요
    async likeChildComment(req, res, next) {
        try {
            const { multi_id, comment_id } = req.params; //req.params로 해당 대댓글이 달린 게시물과 해당 대댓글의 고유id를 받아온다.
            const user = res.locals.user; //현재 로그인한 user의 고유id
            const likeExist = await models_1.CommentLike.findOne({
                where: { multi: multi_id, childComment: comment_id, user },
            }); //해당 대댓글에 로그인한 user가 좋아요한 기록이 있는지 확인
            if (likeExist) {
                //좋아요 기록이 존재하면
                return res.status(400).json({ success: false }); //status code 400, success:false를 보내준다.
            }
            else {
                //좋아요 기록이 없으면
                await models_1.CommentLike.create({
                    user,
                    childComment: Number(comment_id),
                    multi: Number(multi_id),
                }); //좋아요 기록생성
                const likeCnt = await models_1.CommentLike.count({
                    where: { childComment: comment_id, multi: multi_id },
                }); //좋아요 수 count
                await models_1.ChildComment.update({ likeCnt }, { where: { id: Number(comment_id), multi: Number(multi_id) } }); //해당 대댓글의 좋아요 수 정보 update
                res.status(200).json({ success: true, likeCnt }); //status code 200, success:true, 해당 대댓글의 좋아요 수를 보내준다.
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.childCommentControllers = childCommentControllers;
exports.default = new childCommentControllers();
//# sourceMappingURL=child-comment.js.map