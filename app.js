const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
const compression = require('compression');
const cors = require('cors');
require('dotenv').config();
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키값을 꺼낼 수 있음
const port = process.env.PORT;
const { sequelize } = require('./models');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const helmet = require('helmet');
const { routerError, errorHandler } = require('./middlewares/error-handler');

//cors
const corsOptions = {
  origin: true, // 전체 허용
  // credentials: true,
};
app.use(cors(corsOptions));

//sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('MYSQL 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

//morgan
app.use(morgan('dev'));

//helmet
app.use(helmet());

//routing
const router = require('./routes/index');

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // POST로 메소드 받을 때 req.body로 사용가능하게 함
app.use(compression());

//routes
app.use('/', router);

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//errorHandler
app.use(routerError);
app.use(errorHandler);

//server
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
