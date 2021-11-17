"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT;
//server
app_1.default.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
//# sourceMappingURL=server1.js.map