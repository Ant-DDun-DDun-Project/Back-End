"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
class joiValidation {
    constructor() {
        this.signUpSchema = Joi.object({
            userId: Joi.string()
                .required()
                .min(5)
                .max(20)
                .pattern(/^[a-z0-9_-]{5,20}$/),
            nickname: Joi.string().required().min(2).max(7),
            pw: Joi.string()
                .required()
                .min(8)
                .max(16)
                .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9!@#$%^&*?-]{8,16}$/),
            confirmPw: Joi.ref('pw'),
            ageGroup: Joi.number().required(),
        });
        // 로그인 Schema
        this.loginSchema = Joi.object({
            userId: Joi.string().required(),
            pw: Joi.string().required(),
        });
        // 찬반투표 게시물 Schema
        this.eitherSchema = Joi.object({
            title: Joi.string().required(),
            contentA: Joi.string().required(),
            contentB: Joi.string().required(),
            date: Joi.string().required(),
        });
        // 객관식 게시물 Schema
        this.multiSchema = Joi.object({
            title: Joi.string().required().min(1),
            description: Joi.string().required().min(1),
            contentA: Joi.string().required(),
            contentB: Joi.string().required(),
            contentC: Joi.string().allow(null),
            contentD: Joi.string().allow(null),
            contentE: Joi.string().allow(null),
            date: Joi.string().required(),
        });
        // 댓글 작성 Schema
        this.postCommentSchema = Joi.object({
            comment: Joi.string().required().min(1),
            date: Joi.string().required(),
        });
        // 댓글 수정 Schema
        this.editCommentSchema = Joi.object({
            comment: Joi.string().required(),
            editedDate: Joi.string().required(),
        });
        // 객관식 게시물 수정 Schema
        this.editMultiSchema = Joi.object({
            title: Joi.string().required().min(1),
            description: Joi.string().required().min(1),
            contentA: Joi.string().required(),
            contentB: Joi.string().required(),
            contentC: Joi.string().allow(null),
            contentD: Joi.string().allow(null),
            contentE: Joi.string().allow(null),
            editedDate: Joi.string().allow(null),
        });
        // 찬반투표 게시물 수정 Schema
        this.editEitherSchema = Joi.object({
            title: Joi.string().required().min(1),
            contentA: Joi.string().required().min(1),
            contentB: Joi.string().required().min(1),
            editedDate: Joi.string().required(),
        });
        // 아이디 중복 체크 Schema
        this.duplicatedIdSchema = Joi.object({
            userId: Joi.string().required().min(1),
        });
        // 닉네임 중복 체크 Schema
        this.duplicatedNickSchema = Joi.object({
            nickname: Joi.string().required().min(1),
        });
        // 찬반 투표하기 Schema
        this.voteEitherSchema = Joi.object({
            vote: Joi.string().required(),
        });
        // 객관식 투표 Schema
        this.voteMultiSchema = Joi.object({
            select: Joi.string().required(),
        });
        // 닉네임 변경 Schema
        this.editNickSchema = Joi.object({
            nickname: Joi.string().required().min(2).max(7),
        });
    }
}
exports.default = new joiValidation();
//# sourceMappingURL=joi.js.map