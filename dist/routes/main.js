"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const main_1 = require("../controllers/main");
const router = express.Router();
router.get('/', main_1.default.getMain);
exports.default = router;
//# sourceMappingURL=main.js.map