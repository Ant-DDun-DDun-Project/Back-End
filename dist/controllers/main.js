"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const query_1 = require("../models/query");
const posting_count_1 = require("./utils/posting-count");
const attend_count_1 = require("./utils/attend-count");
const mainQuery = new query_1.MainQuery();
class mainControllers {
    constructor() {
        this.getMain = async (req, res, next) => {
            try {
                const [either, multi, [eitherNum, multiNum], attendNum] = await Promise.all([
                    //Promise.all로 각각의 데이터들(찬반투표 포스팅, 객관식 포스팅, 찬반투표 포스팅갯수, 객관식 포스팅갯수, 참여자수)를 병렬적으로 받아온다.
                    models_1.sequelize.query(mainQuery.getMainForEither(), { type: sequelize_1.QueryTypes.SELECT }),
                    models_1.sequelize.query(mainQuery.getMainForMulti(), { type: sequelize_1.QueryTypes.SELECT }),
                    (0, posting_count_1.countPosting)(),
                    (0, attend_count_1.countAttend)(),
                ]);
                const postingNum = eitherNum + multiNum; //포스팅 전체 갯수 = 찬반투표 포스팅갯수 + 객관식 포스팅 갯수
                res.status(200).json({
                    success: true,
                    either,
                    multi,
                    postingNum,
                    multiNum,
                    eitherNum,
                    attendNum,
                }); //status code 200, success:true, 각각의 데이터들(찬반투표 포스팅, 객관식 포스팅, 전체 포스팅 갯수, 찬반투표 포스팅갯수, 객관식 포스팅갯수, 참여자수)
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = new mainControllers();
//# sourceMappingURL=main.js.map