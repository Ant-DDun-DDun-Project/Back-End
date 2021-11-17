import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface MultiAttributes {
  multiId?: number;
  title: string;
  contentA: string;
  contentB: string;
  contentC?: string;
  contentD?: string;
  contentE?: string;
  date: string;
  completed?: boolean;
  edited?: boolean;
  editedDate?: string;
  likeCnt?: number;
  user?: number;
}
export interface MultiModel extends Model<MultiAttributes>, MultiAttributes {}
export class Multi extends Model<MultiModel, MultiAttributes> {}

export type MultiStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MultiModel;
};

export function MultiFactory(sequelize: Sequelize): MultiStatic {
  return <MultiStatic>sequelize.define(
    'Multi',
    {
      multiId: {
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
      contentC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contentD: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contentE: {
        type: DataTypes.STRING,
        allowNull: true,
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
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'Multi',
      tableName: 'multi',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
