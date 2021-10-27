const Sequelize = require('sequelize');

module.exports = class CommentLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
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

  static associate(db) {
    // User 와 Either 게시물 --> 1:N 관계
    db.CommentLike.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.CommentLike.belongsTo(db.ChildComment, {
      foreignKey: 'childComment',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.CommentLike.belongsTo(db.Comment, {
      foreignKey: 'comment',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
