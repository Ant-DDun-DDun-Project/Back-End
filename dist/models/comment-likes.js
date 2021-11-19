"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLikeFactory = exports.CommentLike = void 0;
const sequelize_1 = require("sequelize");
class CommentLike extends sequelize_1.Model {
}
exports.CommentLike = CommentLike;
function CommentLikeFactory(sequelize) {
    return sequelize.define('CommentLike', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'CommentLike',
        tableName: 'commentlikes',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.CommentLikeFactory = CommentLikeFactory;
//# sourceMappingURL=comment-likes.js.map