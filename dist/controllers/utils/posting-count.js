"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countPosting = void 0;
const models_1 = require("../../models");
async function countPosting() {
    //포스팅 갯수 카운트 함수
    try {
        const [either, multi] = await Promise.all([models_1.Either.findAll(), models_1.Multi.findAll()]); //Promise.all로 찬반게시물과 객관식 게시물을 병렬적으로 찾아서 변수로 지정한다.
        const eitherCnt = either.length; //찬반 게시물의 갯수
        const multiCnt = multi.length; //객관식 게시물의 갯수
        return [eitherCnt, multiCnt];
    }
    catch (err) {
        console.error(err);
    }
}
exports.countPosting = countPosting;
;
//# sourceMappingURL=posting-count.js.map