"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = exports.Vote = exports.Comment = exports.CommentLike = exports.ChildComment = exports.Either = exports.Multi = exports.User = exports.sequelize = void 0;
const Sequelize = require("sequelize");
const config_1 = require("../config/config");
const users_1 = require("./users");
const either_1 = require("./either");
const multi_1 = require("./multi");
const child_comments_1 = require("./child-comments");
const comment_likes_1 = require("./comment-likes");
const comments_1 = require("./comments");
const votes_1 = require("./votes");
const likes_1 = require("./likes");
exports.sequelize = new Sequelize.Sequelize(config_1.config.development.database, config_1.config.development.username, config_1.config.development.password, {
    host: config_1.config.development.host,
    port: Number(config_1.config.development.port),
    dialect: 'mysql',
});
// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `db`
exports.User = (0, users_1.UserFactory)(exports.sequelize);
exports.Multi = (0, multi_1.MultiFactory)(exports.sequelize);
exports.Either = (0, either_1.EitherFactory)(exports.sequelize);
exports.ChildComment = (0, child_comments_1.ChildCommentFactory)(exports.sequelize);
exports.CommentLike = (0, comment_likes_1.CommentLikeFactory)(exports.sequelize);
exports.Comment = (0, comments_1.CommentFactory)(exports.sequelize);
exports.Vote = (0, votes_1.VoteFactory)(exports.sequelize);
exports.Like = (0, likes_1.LikeFactory)(exports.sequelize);
// User relationship
exports.User.hasMany(exports.Either, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.User.hasMany(exports.Multi, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.User.hasMany(exports.ChildComment, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.User.hasMany(exports.CommentLike, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.User.hasMany(exports.Comment, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.User.hasMany(exports.Vote, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.User.hasMany(exports.Like, {
    foreignKey: 'user',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
// Either relationship
exports.Either.hasMany(exports.Vote, {
    foreignKey: 'either',
    sourceKey: 'eitherId',
    onDelete: 'CASCADE',
});
exports.Either.hasMany(exports.Like, {
    foreignKey: 'either',
    sourceKey: 'eitherId',
    onDelete: 'CASCADE',
});
exports.Either.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
// Multi relationship
exports.Multi.hasMany(exports.CommentLike, {
    foreignKey: 'multi',
    sourceKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.Multi.hasMany(exports.Comment, {
    foreignKey: 'multi',
    sourceKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.Multi.hasMany(exports.ChildComment, {
    foreignKey: 'multi',
    sourceKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.Multi.hasMany(exports.Vote, {
    foreignKey: 'multi',
    sourceKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.Multi.hasMany(exports.Like, {
    foreignKey: 'multi',
    sourceKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.Multi.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
// ChildComment relationship
exports.ChildComment.hasMany(exports.CommentLike, {
    foreignKey: 'childComment',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.ChildComment.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
exports.ChildComment.belongsTo(exports.Multi, {
    foreignKey: 'multi',
    as: 'Multi',
    targetKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.ChildComment.belongsTo(exports.Comment, {
    foreignKey: 'parentComment',
    as: 'parentComments',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
// Vote relationship
exports.Vote.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
exports.Vote.belongsTo(exports.Either, {
    foreignKey: 'either',
    as: 'Either',
    targetKey: 'eitherId',
    onDelete: 'CASCADE',
});
exports.Vote.belongsTo(exports.Multi, {
    foreignKey: 'multi',
    as: 'Multi',
    targetKey: 'multiId',
    onDelete: 'CASCADE',
});
// Commnet relationship
exports.Comment.hasMany(exports.ChildComment, {
    foreignKey: 'parentComment',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.Comment.hasMany(exports.CommentLike, {
    foreignKey: 'comment',
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
exports.Comment.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
exports.Comment.belongsTo(exports.Multi, {
    foreignKey: 'multi',
    as: 'Multi',
    targetKey: 'multiId',
    onDelete: 'CASCADE',
});
// CommentLike relationship
exports.CommentLike.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
exports.CommentLike.belongsTo(exports.ChildComment, {
    foreignKey: 'childComment',
    as: 'childComments',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
exports.CommentLike.belongsTo(exports.Multi, {
    foreignKey: 'multi',
    as: 'Multi',
    targetKey: 'multiId',
    onDelete: 'CASCADE',
});
exports.CommentLike.belongsTo(exports.Comment, {
    foreignKey: 'comment',
    as: 'comments',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
// Like relationship
exports.Like.belongsTo(exports.User, {
    foreignKey: 'user',
    as: 'users',
    targetKey: 'id',
    onDelete: 'CASCADE',
});
exports.Like.belongsTo(exports.Either, {
    foreignKey: 'either',
    as: 'Either',
    targetKey: 'eitherId',
    onDelete: 'CASCADE',
});
exports.Like.belongsTo(exports.Multi, {
    foreignKey: 'multi',
    as: 'Multi',
    targetKey: 'multiId',
    onDelete: 'CASCADE',
});
//# sourceMappingURL=index.js.map