import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface EitherAttributes {
  eitherId?: number;
  title: string;
  contentA: string;
  contentB: string;
  date: string;
  completed?: boolean;
  edited?: boolean;
  editedDate?: string;
  likeCnt?: number;
  user?: number | string;
}
export interface EitherModel extends Model<EitherAttributes>, EitherAttributes {}
export class Either extends Model<EitherModel, EitherAttributes> {}

export type EitherStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EitherModel;
};

export function EitherFactory(sequelize: Sequelize): EitherStatic {
  return <EitherStatic>sequelize.define(
    'Either',
    {
      eitherId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contentA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contentB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      editedDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likeCnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'Either',
      tableName: 'either',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
