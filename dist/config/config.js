"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    development: {
        username: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PW,
        database: process.env.DB_LOCAL_NAME,
        host: process.env.DB_LOCAL_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    },
};
//# sourceMappingURL=config.js.map