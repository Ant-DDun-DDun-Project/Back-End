"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
require("dotenv/config");
const { combine, timestamp, printf, colorize, json, simple } = winston.format;
const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장
const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), logFormat),
    transports: [
        // warn 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/warn',
            filename: `%DATE%.warn.log`,
            maxFiles: 20,
            zippedArchive: true,
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});
// logger.stream = {
//   // morgan wiston 설정
//   write: (message) => {
//     const state = message.split(' ')[2].replace(/\x1b\[[0-9;]*m/g, '');
//     if (state < 400) {
//       //status code가 400보다 아래면
//       logger.info(message); //level info
//     } else if (400 <= state && state < 500) {
//       //status code가 400이상 500 미만이면
//       logger.warn(message); //level warn
//     } else if (state >= 500) {
//       //status code가 500이상이면
//       logger.error(message); //level error
//     }
//   },
// };
// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
if (process.env.NODE_ENV == 'production') {
    logger.add(new winston.transports.Console({
        format: combine(colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        logFormat // log format 적용
        ),
    }));
}
module.exports = logger;
//# sourceMappingURL=logger.js.map