import app from './app';
const port = process.env.PORT;

//server
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});