import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CommentAttributes {
  id?: number;
  comment: string;
  date: string;
  edited?: boolean;
  editedDate?: string;
  deleted?: boolean;
  likeCnt?: number;
  user?: number | string;
  multi?: number | string;
}

export interface CommentModel extends Model<CommentAttributes>, CommentAttributes {}
export class Comment extends Model<CommentModel, CommentAttributes> {}

export type CommentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentModel;
};

export function CommentFactory(sequelize: Sequelize): CommentStatic {
  return <CommentStatic>sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      editedDate: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      likeCnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
}
