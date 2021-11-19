"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const query_1 = require("../models/query");
const sequelize_1 = require("sequelize");
const searchQuery = new query_1.SearchQuery();
class searchControllers {
    constructor() {
        //검색기능
        this.searchPosts = async (req, res, next) => {
            try {
                const keyword = req.query.keyword; //req.query로 검색 keyword를 받는다.
                const keywords = keyword.trim().replace(/\s\s+/gi, ' ').split(' '); //공백 제거 (trim으로 앞뒤 공백 제거, replace를 통해서 2번 연속으로 공백이 되어있는 것을 1번공백으로 적용.) 후 공백으로 keyword를 나눔
                if (!keyword.length) {
                    //keyword가 없으면
                    res.status(400).json({ success: false }); //status code는 400, success:false를 보내준다.
                }
                const searchedPosts = []; //검색된 포스트들을 담을 배열
                for (let word of keywords) {
                    //공백으로 나눈 keyword들을 각각 word라는 변수로 지정하여 반복문
                    const [searchedEither, searchedMulti] = await Promise.all([
                        //Promise.all로 DB에서 검색어가 포함된 찬반투표, 객관식 포스팅을 병렬적으로 찾음
                        models_1.sequelize.query(searchQuery.searchEither(word), {
                            type: sequelize_1.QueryTypes.SELECT,
                        }),
                        models_1.sequelize.query(searchQuery.searchMulti(word), {
                            type: sequelize_1.QueryTypes.SELECT,
                        }),
                    ]);
                    searchedPosts.push([...searchedEither, ...searchedMulti]); //searchedPosts에 담음
                }
                const posts = searchedPosts.flat().sort((b, a) => {
                    // @ts-ignore
                    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
                }); //다차원 배열을 1차원 배열로 만든 후 날짜순으로 정렬
                res.status(200).json({ success: true, posts }); //status code는 200, success: true, 검색된 포스트들을 보내준다.
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = new searchControllers();
//# sourceMappingURL=search.js.map