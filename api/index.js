import express from "express";

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(
    `Server is listening at http://${host}which is your machine and port:${port}`
  );
});
