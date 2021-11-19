"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countAttend = void 0;
const models_1 = require("../../models");
const sequelize = require("sequelize");
async function countAttend() {
    //투표에 참여한 user을 뽑아옴(중복제거)
    try {
        const votes = await models_1.Vote.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('user')), 'vote']],
        });
        //투표에 참여한 user
        return votes.length; //투표에 참여한 user의 수를 반환한다.
    }
    catch (err) {
        console.error(err);
    }
}
exports.countAttend = countAttend;
;
//# sourceMappingURL=attend-count.js.map