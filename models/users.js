const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        pw: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ageGroup: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        exp: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // User 와 Either 게시물 --> 1:N 관계
    db.User.hasMany(db.Either, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User 와 Multi 게시물 --> 1:N 관계
    db.User.hasMany(db.Multi, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User 와 Like --> 1:N 관계
    db.User.hasMany(db.Like, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User 와 Vote --> 1:N 관계
    db.User.hasMany(db.Vote, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User 와 Comment --> 1:N 관계
    db.User.hasMany(db.Comment, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User 와 ChildComment
    db.User.hasMany(db.ChildComment, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User 와 CommentLike --> 1:N 관계
    db.User.hasMany(db.CommentLike, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
