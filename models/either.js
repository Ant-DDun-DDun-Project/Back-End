const Sequelize = require('sequelize');

module.exports = class Either extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        eitherId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        contentA: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        contentB: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        edited: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        editedDate: {
          type: Sequelize.STRING,
          allowNull: true,
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
        modelName: 'Either',
        tableName: 'either',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Either.hasMany(db.Like, {
      foreignKey: 'either',
      sourceKey: 'eitherId',
      onDelete: 'CASCADE',
    });
    db.Either.hasMany(db.Vote, {
      foreignKey: 'either',
      sourceKey: 'eitherId',
      onDelete: 'CASCADE',
    });
    db.Either.belongsTo(db.User, {
      foreignKey: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
};
