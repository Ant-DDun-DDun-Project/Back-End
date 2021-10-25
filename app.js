const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
app.use(cookieParser()); // 쿠키값을 꺼낼 수 있음
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const { sequelize } = require('./models');

//cors 설정
const corsOptions = {
  origin: '*', // 전체 허용
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("MYSQL 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // POST로 메소드 받을 때 req.body로 사용가능하게 함

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
