"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteFactory = exports.Vote = void 0;
const sequelize_1 = require("sequelize");
class Vote extends sequelize_1.Model {
}
exports.Vote = Vote;
function VoteFactory(sequelize) {
    return sequelize.define('votes', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        vote: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'Vote',
        tableName: 'votes',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
exports.VoteFactory = VoteFactory;
//# sourceMappingURL=votes.js.map