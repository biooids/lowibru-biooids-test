import User from "../models/user.model.js";
import argon2 from "argon2";
import { errorHandler } from "../utils.js";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, userName, emailOrPhone, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !userName ||
    !emailOrPhone ||
    !password ||
    firstName === "" ||
    lastName === "" ||
    userName === "" ||
    emailOrPhone === "" ||
    password === ""
  ) {
    next(
      errorHandler(
        400,
        "Empty required fields. Please provide all required* input fields "
      )
    );
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      firstName,
      lastName,
      userName,
      emailOrPhone,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json({ message: "user sign up successfully" });
  } catch (error) {
    next(error);
  }
};
