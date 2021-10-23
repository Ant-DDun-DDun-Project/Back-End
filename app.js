const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
app.use(cookieParser()); // 쿠키값을 꺼낼 수 있음
const port = 3000;
const authMiddleware = require('./middlewares/auth-middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // POST로 메소드 받을 때 req.body로 사용가능하게 함

app.listen(port, () => {
  console.log(`listening at http://localhost:${ port }`);
});
