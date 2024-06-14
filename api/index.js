import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is listening at http://${host}:${port}`);
});
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongo db was connected successfully");
  })
  .catch((err) => {
    console.log(`server not working because of ${err}`);
  });

app.use("/api/user", userRoutes);
