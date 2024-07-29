import express from "express";
import mongoose from "mongoose";

import testingRoutes from "./routes/testing.routes.js";
import authRoutes from "./routes/auth.routes.js";

import dotenv from "dotenv";
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

app.use(express.json());
app.use("/api/testing", testingRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message =
    `sign up failed due to : ${error.message}` ||
    "sign up failed due to : Internal Server Error";

  const responseError = {
    success: false,
    statusCode,
    message,
  };
  res.status(statusCode).json(responseError);
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is listening at http://${host}:${port}`);
});
