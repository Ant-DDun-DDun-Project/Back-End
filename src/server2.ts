import app from './app';

const port = process.env.PORT2;

//server
app.listen(port, (): void => {
  console.log(`listening at http://localhost:${port}`);
});
