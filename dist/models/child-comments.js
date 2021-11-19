"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildCommentFactory = exports.ChildComment = void 0;
const sequelize_1 = require("sequelize");
class ChildComment extends sequelize_1.Model {
}
exports.ChildComment = ChildComment;
function ChildCommentFactory(sequelize) {
    return sequelize.define('ChildComment', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        edited: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'ChildComment',
        tableName: 'childcomments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.ChildCommentFactory = ChildCommentFactory;
//# sourceMappingURL=child-comments.js.map