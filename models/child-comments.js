const Sequelize = require('sequelize');

module.exports = class ChildComment extends Sequelize.Model {
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
        },
      },
      {
        sequelize,
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

  static associate(db) {
    // User 와 Either 게시물 --> 1:N 관계
    db.ChildComment.hasMany(db.CommentLike, {
      foreignKey: 'childComment',
      sourceKey: 'id',
    });
    db.ChildComment.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
    });
    db.ChildComment.belongsTo(db.Multi, {
      foreignKey: 'multi',
      targetKey: 'multiId',
    });
    db.ChildComment.belongsTo(db.Comment, {
      foreignKey: 'parentComment',
      targetKey: 'id',
    });

  }
};
