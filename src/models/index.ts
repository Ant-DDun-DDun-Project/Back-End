import * as Sequelize from 'sequelize';
import { UserFactory } from './users';
import { EitherFactory } from './either';
import { config } from '../config/config';
import { MultiFactory } from './multi';

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
