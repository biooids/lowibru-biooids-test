import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } //time stamp for mongo create extra information like the time of creation  and time of update
);
const User = mongoose.model("User", userSchema); //mongo db adds s to become Users
export default User;
