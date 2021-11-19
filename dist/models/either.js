"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EitherFactory = exports.Either = void 0;
const sequelize_1 = require("sequelize");
class Either extends sequelize_1.Model {
}
exports.Either = Either;
function EitherFactory(sequelize) {
    return sequelize.define('Either', {
        eitherId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
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
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'Either',
        tableName: 'either',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.EitherFactory = EitherFactory;
//# sourceMappingURL=either.js.map