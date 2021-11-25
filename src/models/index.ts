import * as Sequelize from 'sequelize';
import { config } from '../config/config';
import { UserFactory } from './users';
import { EitherFactory } from './either';
import { MultiFactory } from './multi';
import { ChildCommentFactory } from './child-comments';
import { CommentLikeFactory } from './comment-likes';
import { CommentFactory } from './comments';
import { VoteFactory } from './votes';
import { LikeFactory } from './likes';
import { VisitorFactory } from './visitors';

export const sequelize = new Sequelize.Sequelize(
  config.production.database,
  config.production.username,
  config.production.password,
  {
    host: config.production.host,
    port: Number(config.production.port),
    dialect: 'mysql',
    logging: config.production.logging
  }
);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `db`

export const User = UserFactory(sequelize);
export const Multi = MultiFactory(sequelize);
export const Either = EitherFactory(sequelize);
export const ChildComment = ChildCommentFactory(sequelize);
export const CommentLike = CommentLikeFactory(sequelize);
export const Comment = CommentFactory(sequelize);
export const Vote = VoteFactory(sequelize);
export const Like = LikeFactory(sequelize);
export const Visitor = VisitorFactory(sequelize);

// User relationship
User.hasMany(Either, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
User.hasMany(Multi, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
User.hasMany(ChildComment, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
User.hasMany(CommentLike, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
User.hasMany(Comment, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
User.hasMany(Vote, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
User.hasMany(Like, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

// Either relationship
Either.hasMany(Vote, {
  foreignKey: 'either',
  sourceKey: 'eitherId',
  onDelete: 'CASCADE',
});
Either.hasMany(Like, {
  foreignKey: 'either',
  sourceKey: 'eitherId',
  onDelete: 'CASCADE',
});
Either.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

// Multi relationship
Multi.hasMany(CommentLike, {
  foreignKey: 'multi',
  sourceKey: 'multiId',
  onDelete: 'CASCADE',
});
Multi.hasMany(Comment, {
  foreignKey: 'multi',
  sourceKey: 'multiId',
  onDelete: 'CASCADE',
});
Multi.hasMany(ChildComment, {
  foreignKey: 'multi',
  sourceKey: 'multiId',
  onDelete: 'CASCADE',
});
Multi.hasMany(Vote, {
  foreignKey: 'multi',
  sourceKey: 'multiId',
  onDelete: 'CASCADE',
});
Multi.hasMany(Like, {
  foreignKey: 'multi',
  sourceKey: 'multiId',
  onDelete: 'CASCADE',
});
Multi.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

// ChildComment relationship
ChildComment.hasMany(CommentLike, {
  foreignKey: 'childComment',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
ChildComment.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
ChildComment.belongsTo(Multi, {
  foreignKey: 'multi',
  as: 'Multi',
  targetKey: 'multiId',
  onDelete: 'CASCADE',
});
ChildComment.belongsTo(Comment, {
  foreignKey: 'parentComment',
  as: 'parentComments',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

// Vote relationship
Vote.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
Vote.belongsTo(Either, {
  foreignKey: 'either',
  as: 'Either',
  targetKey: 'eitherId',
  onDelete: 'CASCADE',
});
Vote.belongsTo(Multi, {
  foreignKey: 'multi',
  as: 'Multi',
  targetKey: 'multiId',
  onDelete: 'CASCADE',
});

// Commnet relationship
Comment.hasMany(ChildComment, {
  foreignKey: 'parentComment',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
Comment.hasMany(CommentLike, {
  foreignKey: 'comment',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Multi, {
  foreignKey: 'multi',
  as: 'Multi',
  targetKey: 'multiId',
  onDelete: 'CASCADE',
});

// CommentLike relationship
CommentLike.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
CommentLike.belongsTo(ChildComment, {
  foreignKey: 'childComment',
  as: 'childComments',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
CommentLike.belongsTo(Multi, {
  foreignKey: 'multi',
  as: 'Multi',
  targetKey: 'multiId',
  onDelete: 'CASCADE',
});
CommentLike.belongsTo(Comment, {
  foreignKey: 'comment',
  as: 'comments',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

// Like relationship
Like.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
Like.belongsTo(Either, {
  foreignKey: 'either',
  as: 'Either',
  targetKey: 'eitherId',
  onDelete: 'CASCADE',
});
Like.belongsTo(Multi, {
  foreignKey: 'multi',
  as: 'Multi',
  targetKey: 'multiId',
  onDelete: 'CASCADE',
});
