import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface VoteAttributes {
  id?: number;
  vote: string;
  user?: number | string;
<<<<<<< HEAD
  either?: number | string;
=======
  either?: number | string
>>>>>>> 02e8f5aefcd1aebc9ae846106fa52e93d65f733d
  multi?: number | string;
}

export interface VoteModel extends Model<VoteAttributes>, VoteAttributes {}
export class Vote extends Model<VoteModel, VoteAttributes> {}

export type VoteStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): VoteModel;
};

export function VoteFactory(sequelize: Sequelize): VoteStatic {
  return <VoteStatic>sequelize.define(
    'votes',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      vote: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: false,
      modelName: 'Vote',
      tableName: 'votes',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
}
