const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
const compression = require('compression');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const morgan = require('morgan');
const logger = require('./logger');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const helmet = require('helmet');
const { routerError, errorHandler } = require('./middlewares/error-handler');

//morgan(로그)
app.use(morgan('dev', { stream: logger.stream }));

//cors
const corsOptions = {
  origin: true, // 전체 허용
  // credentials: true,
};
app.use(cors(corsOptions));

//sequelize(ORM)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('MYSQL 연결 성공');
  })
  .catch((err) => {
    next(err);
  });

//helmet(보안)
app.use(helmet());

//routing
const router = require('./routes/index');

//parser
app.use(express.urlencoded({ extended: true })); //body parser
app.use(express.json()); //body parser
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie parser

//compression(데이터 압축)
app.use(compression());

//routes
app.use('/', router);

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//errorHandler
app.use(routerError);
app.use(errorHandler);

module.exports = app;
