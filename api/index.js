import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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
    console.log("Mongo db Atlas was connected successfully");
  })
  .catch((err) => {
    console.log(`server not working because of ${err}`);
  });
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
