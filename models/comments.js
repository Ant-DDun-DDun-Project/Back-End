const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        edited: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        editedDate: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        deleted: {
          type: Sequelize.STRING,
          defaultValue: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // User 와 Either 게시물 --> 1:N 관계
    db.Comment.hasMany(db.CommentLike, {
      foreignKey: 'comment',
      sourceKey: 'id',
    });
    db.Comment.hasMany(db.ChildComment, {
      foreignKey: 'parentComment',
      sourceKey: 'id',
    });
    db.Comment.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
    })
    db.Comment.belongsTo(db.Multi, {
      foreignKey: 'multi',
      targetKey: 'multiId',
    });

  }
};
