"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactory = exports.Comment = void 0;
const sequelize_1 = require("sequelize");
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
function CommentFactory(sequelize) {
    return sequelize.define('Comment', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        edited: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        editedDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        deleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        likeCnt: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.CommentFactory = CommentFactory;
//# sourceMappingURL=comments.js.map