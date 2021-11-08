const Sequelize = require('sequelize');

module.exports = class Vote extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        vote: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
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

  static associate(db) {
    db.Vote.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Vote.belongsTo(db.Either, {
      foreignKey: 'either',
      targetKey: 'eitherId',
      onDelete: 'CASCADE',
    });
    db.Vote.belongsTo(db.Multi, {
      foreignKey: 'multi',
      targetKey: 'multiId',
      onDelete: 'CASCADE',
    });
  }
};
