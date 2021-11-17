import * as Sequelize from 'sequelize';
import { config } from '../config/config';
import { UserFactory } from './users';
import { EitherFactory } from './either';
import { MultiFactory } from './multi';
import { ChildCommentFactory } from './child-comments';
import { CommentLikeFactory } from './comment-likes';

export const sequelize = new Sequelize.Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: Number(config.development.port),
    dialect: 'mysql',
  }
);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `db`

export const User = UserFactory(sequelize);
export const Multi = MultiFactory(sequelize);
export const Either = EitherFactory(sequelize);
export const ChildComment = ChildCommentFactory(sequelize);
export const CommentLike = CommentLikeFactory(sequelize);

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

// Either relationship
Either.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

// Multi relationship
Multi.hasMany(ChildComment, {
  foreignKey: 'multi',
  sourceKey: 'multiId',
  onDelete: 'CASCADE',
});
Multi.hasMany(CommentLike, {
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
// ChildComment.belongsTo(Comment, {
//   foreignKey: 'parentComment',
//   targetKey: 'id',
//   onDelete: 'CASCADE',
// });

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
// CommentLike.belongsTo(Comment,{
//   foreignKey: 'comment',
//   targetKey: 'id',
//   onDelete: 'CASCADE',
// })
