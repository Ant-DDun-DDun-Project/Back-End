const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
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

  static associate(db) {
    db.Like.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Like.belongsTo(db.Either, {
      foreignKey: 'either',
      targetKey: 'eitherId',
      onDelete: 'CASCADE',
    });
    db.Like.belongsTo(db.Multi, {
      foreignKey: 'multi',
      targetKey: 'multiId',
      onDelete: 'CASCADE',
    });
  }
};
