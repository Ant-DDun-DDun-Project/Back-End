import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CommentLikeAttributes {
  id?: number;
  user?: number;
  childComment?: number;
  comment?: number;
  multi?: number;
}
export interface CommentLikeModel extends Model<CommentLikeAttributes>, CommentLikeAttributes {}
export class CommentLike extends Model<CommentLikeModel, CommentLikeAttributes> {}

export type CommentLikeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentLikeModel;
};

export function CommentLikeFactory(sequelize: Sequelize): CommentLikeStatic {
  return <CommentLikeStatic>sequelize.define(
    'CommentLike',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'CommentLike',
      tableName: 'commentlikes',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
