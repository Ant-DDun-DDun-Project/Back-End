import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import 'dotenv/config';

const { combine, timestamp, printf, colorize, json, simple } = winston.format;

const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    // warn 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/warn',
      filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
      maxFiles: 20, // 20일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

export const stream = {
  // morgan wiston 설정
  write: (message: string) => {
    const state: number = Number(message.split(' ')[2].replace(/\x1b\[[0-9;]*m/g, ''));
    if (state < 400) {
      //status code가 400보다 아래면
      logger.info(message); //level info
    } else if (400 <= state && state < 500) {
      //status code가 400이상 500 미만이면
      logger.warn(message); //level warn
    } else if (state >= 500) {
      //status code가 500이상이면
      logger.error(message); //level error
    }
  },
};

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
if (process.env.NODE_ENV == 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        logFormat // log format 적용
      ),
    })
  );
}
