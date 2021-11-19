"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerError = exports.errorHandler = void 0;
const logger_1 = require("../logger");
require("dotenv/config");
function errorHandler(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    logger_1.logger.error(`${err.stack}`);
    console.error(err);
    res.status(err.status || 500).send(err.message);
}
exports.errorHandler = errorHandler;
function routerError(req, res, next) {
    const error = new Error(`${req.method} ${req.originalUrl} 라우터 에러입니다.`);
    error.status = 404;
    next(error);
}
exports.routerError = routerError;
//# sourceMappingURL=error-handler.js.map