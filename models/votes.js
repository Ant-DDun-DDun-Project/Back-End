const Sequelize = require('sequelize');

module.exports = class Vote extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        vote: {
          type: Sequelize.STRING,
          allowNull: false
        }
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
    // User 와 Either 게시물 --> 1:N 관계
    db.Vote.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
    })
    db.Vote.belongsTo(db.Either, {
      foreignKey: 'either',
      targetKey: 'eitherId',
    });
    db.Vote.belongsTo(db.Multi, {
      foreignKey: 'multi',
      targetKey: 'multiId',
    })
  }
};
