import app from "./app";

const port = 3001;

app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}/`);
});
