import * as Sequelize from 'sequelize';
import { UserFactory } from './users';
import { EitherFactory } from './either';
import { config } from '../config/config';
import { MultiFactory } from './multi';
import { CommentFactory } from './comments';
import { VoteFactory } from './votes';
import { LikeFactory} from './likes';

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
export const Comment = CommentFactory(sequelize);
export const Vote = VoteFactory(sequelize);
export const Like = LikeFactory(sequelize);

// Users have either then lets create that relationship
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
User.hasMany(Comment, {
  foreignKey: 'user',
  sourceKey: 'id',
  onDelete: 'CASCADE'
});
User.hasMany(Vote, {
  foreignKey: 'user',
  sourceKey: 'id',
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
// or instead of that, maybe many users have many either
Either.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
Multi.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE',
});
Vote.belongsTo(User, {
  foreignKey: 'user',
  as: 'users',
  targetKey: 'id',
  onDelete: 'CASCADE'
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

