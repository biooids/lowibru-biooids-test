import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emailOrPhone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    isLeader: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
