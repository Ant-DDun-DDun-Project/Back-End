const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
const compression = require('compression');
app.use(cookieParser()); // 쿠키값을 꺼낼 수 있음
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const { sequelize } = require('./models');

//cors
const corsOptions = {
  origin: '*', // 전체 허용
  credentials: true,
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

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // POST로 메소드 받을 때 req.body로 사용가능하게 함
app.use(compression());

//server
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
