const limit = require('express-rate-limit');

exports.limiter = new limit({
  windowMs: 1000, //이 시간동안
  max: 15, //최대횟수
  delayMs: 0, //요청간 간격
  handler(req, res) {
    //어겼을 경우
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: '1초에 최대 10번까지 요청가능 합니다.',
    });
  },
});
