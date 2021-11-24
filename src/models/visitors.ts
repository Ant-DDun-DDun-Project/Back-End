import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface VisitorAttributes {
  id?: number;
  date?: string;
  visitorCnt?: number;
  location?: string;
}

export interface VisitorModel extends Model<VisitorAttributes>, VisitorAttributes {}
export class Visitor extends Model<VisitorModel, VisitorAttributes> {}

export type VisitorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): VisitorModel;
};

export function VisitorFactory(sequelize: Sequelize): VisitorStatic {
  return <VisitorStatic>sequelize.define(
    'visitors',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitorCnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'Visitor',
      tableName: 'visitors',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
