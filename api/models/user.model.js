import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
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
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29Z2Pxk_o5wN43ZJ-ieda1FlP0x01uE-uoZ6jUcb-hZgq99orRaSVSQikwA&s", //add this
    },
  },
  { timestamps: true } //time stamp for mongo create extra information like the time of creation  and time of update
);
const User = mongoose.model("User", userSchema); //mongo db adds s to become Users
export default User;
