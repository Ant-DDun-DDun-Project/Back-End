"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const search_1 = require("../controllers/search");
const router = express.Router();
router.get('/', search_1.default.searchPosts);
exports.default = router;
//# sourceMappingURL=search.js.map