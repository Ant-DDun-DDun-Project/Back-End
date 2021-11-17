import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ChildCommentAttributes {
  id?: number;
  date: string;
  comment: string;
  edited?: boolean;
  editedDate?: string;
  deleted?: boolean;
  likeCnt?: number;
  user?: number;
  multi?: number;
  parentComment?: number;
}
export interface ChildCommentModel extends Model<ChildCommentAttributes>, ChildCommentAttributes {}
export class ChildComment extends Model<ChildCommentModel, ChildCommentAttributes> {}

export type ChildCommentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ChildCommentModel;
};

export function ChildCommentFactory(sequelize: Sequelize): ChildCommentStatic {
  return <ChildCommentStatic>sequelize.define(
    'ChildComment',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: 'ChildComment',
      tableName: 'childcomments',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
