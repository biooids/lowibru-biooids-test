import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import testingRoutes from "./routes/testing.routes.js";

dotenv.config();

const app = express();

const PORT = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongo db Atlas connected successfully");
  })
  .catch((error) => {
    console.log(`couldn't connect to mongodb atlas due to error ${error}`);
  });

app.use("/api/testing", testingRoutes);

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is listening at http://${host}:${port}`);
});
