import app from './app';
import { dauSchedule } from './middlewares/DAU';

const port = process.env.PORT;

//DAU
dauSchedule();

//server
app.listen(port, (): void => {
  console.log(`listening at http://localhost:${port}`);
});
