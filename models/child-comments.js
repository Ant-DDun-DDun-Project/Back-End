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
          defaultValue: null,
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        likeCnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
    db.ChildComment.hasMany(db.CommentLike, {
      foreignKey: 'childComment',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    db.ChildComment.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.ChildComment.belongsTo(db.Multi, {
      foreignKey: 'multi',
      targetKey: 'multiId',
      onDelete: 'CASCADE',
    });
    db.ChildComment.belongsTo(db.Comment, {
      foreignKey: 'parentComment',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
