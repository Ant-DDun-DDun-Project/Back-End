import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import 'dotenv/config';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger_output.json';
import * as helmet from 'helmet';
import { sequelize } from './models';
import { stream } from './logger';

const app: express.Application = express();

//morgan(로그)
app.use(morgan('dev', { stream }));

//cors
const corsOptions = {
  origin: 'https://antsori.com', // 전체 허용
  credentials: true,
};
app.use(cors(corsOptions));

//sequelize(ORM)
sequelize
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
import router from './routes/index';
import { limiter } from './middlewares/rate-limit';
import { routerError } from './middlewares/error-handler';
import { errorHandler } from './middlewares/error-handler';

//parser
app.use(express.urlencoded({ extended: true })); //body parser
app.use(express.json()); //body parser
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie parser

//compression(데이터 압축)
app.use(compression());

//routes
app.use('/', limiter, router);

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//errorHandler
app.use(routerError);
app.use(errorHandler);

export default app;
