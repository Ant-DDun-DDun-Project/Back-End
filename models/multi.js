const Sequelize = require('sequelize');

module.exports = class Multi extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        multiId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
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
        contentC: {
          type: Sequelize.STRING,
        },
        contentD: {
          type: Sequelize.STRING,
        },
        contentE: {
          type: Sequelize.STRING,
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
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Multi',
        tableName: 'multi',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Multi.hasMany(db.Like, {
      foreignKey: 'multi',
      sourceKey: 'multiId',
    });
    db.Multi.hasMany(db.Vote, {
      foreignKey: 'multi',
      sourceKey: 'multiId',
    });
    db.Multi.hasMany(db.ChildComment, {
      foreignKey: 'multi',
      sourceKey: 'multiId',
    });
    db.Multi.hasMany(db.Comment, {
      foreignKey: 'multi',
      sourceKey: 'multiId',
    });
  }
};
