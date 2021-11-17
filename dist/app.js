"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const compression = require("compression");
const cors = require("cors");
require("dotenv/config");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const helmet = require("helmet");
const models_1 = require("./models");
//morgan(로그)
// app.use(morgan('dev', { stream: logger.stream }));
//cors
const corsOptions = {
    origin: true, // 전체 허용
    // credentials: true,
};
app.use(cors(corsOptions));
//sequelize(ORM)
models_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log('MYSQL 연결 성공');
})
    .catch((err) => {
    console.error(err);
});
//helmet(보안)
app.use(helmet());
//routing
const index_1 = require("./routes/index");
//parser
app.use(express.urlencoded({ extended: true })); //body parser
app.use(express.json()); //body parser
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie parser
//compression(데이터 압축)
app.use(compression());
//routes
app.use('/', index_1.default);
//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
//errorHandler
// app.use(routerError);
// app.use(errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map