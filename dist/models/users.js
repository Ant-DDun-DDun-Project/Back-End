"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function UserFactory(sequelize) {
    return sequelize.define('User', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pw: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ageGroup: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        exp: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=users.js.map