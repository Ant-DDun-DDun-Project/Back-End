import { BuildOptions, Model, Sequelize } from 'sequelize';

export interface LikeAttributes {
  id?: number;
  user?: number | string;
  either?: number | string;
  multi?: number | string;
}

export interface LikeModel extends Model<LikeAttributes>, LikeAttributes {}
export class Like extends Model<LikeModel, LikeAttributes> {}

export type LikeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LikeModel;
};

export function LikeFactory(sequelize: Sequelize): LikeStatic {
  return <LikeStatic>sequelize.define(
    'Like',
    {
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'Like',
      tableName: 'likes',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
