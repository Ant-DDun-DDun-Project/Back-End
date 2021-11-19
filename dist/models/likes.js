"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeFactory = exports.Like = void 0;
const sequelize_1 = require("sequelize");
class Like extends sequelize_1.Model {
}
exports.Like = Like;
function LikeFactory(sequelize) {
    return sequelize.define('Like', {}, {
        timestamps: false,
        underscored: false,
        modelName: 'Like',
        tableName: 'likes',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.LikeFactory = LikeFactory;
//# sourceMappingURL=likes.js.map