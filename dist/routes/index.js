"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const user_1 = require("./user");
const profile_1 = require("./profile");
const main_1 = require("./main");
const search_1 = require("./search");
const either_1 = require("./either");
const multi_1 = require("./multi");
router.use('/', main_1.default);
router.use('/users', user_1.default);
router.use('/profile', profile_1.default);
router.use('/search', search_1.default);
router.use('/posts/multi', multi_1.default);
router.use('/posts/either', either_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map