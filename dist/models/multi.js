"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiFactory = exports.Multi = void 0;
const sequelize_1 = require("sequelize");
class Multi extends sequelize_1.Model {
}
exports.Multi = Multi;
function MultiFactory(sequelize) {
    return sequelize.define('Multi', {
        multiId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        contentA: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        contentB: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        contentC: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        contentD: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        contentE: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        edited: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        editedDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        likeCnt: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        user: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'Multi',
        tableName: 'multi',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.MultiFactory = MultiFactory;
//# sourceMappingURL=multi.js.map