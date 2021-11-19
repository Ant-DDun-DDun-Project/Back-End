"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.authForGuest = void 0;
const jwt = require("jsonwebtoken");
require("dotenv/config");
// 게스트 허용 인증 미들웨어
function authForGuest(req, res, next) {
    try {
        const token = req.cookies.user;
        if (!token) {
            res.locals.user = 13;
            next();
        }
        else {
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
            res.locals.user = id;
            next();
        }
    }
    catch (err) {
        next(err);
    }
}
exports.authForGuest = authForGuest;
// 사용자 인증 미들웨어
function auth(req, res, next) {
    try {
        const token = req.cookies.user;
        if (!token) {
            res.status(401).json({ success: false });
        }
        else {
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
            res.locals.user = id;
            next();
        }
    }
    catch (err) {
        next(err);
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map