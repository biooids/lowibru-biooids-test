import User from "../models/user.model.js";
import argon2 from "argon2";
import { errorHandler } from "../utils.js";
import Jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

import crypto from "crypto";

export const signUp = async (req, res, next) => {
  console.log(req.body);
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
    return next(
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

    const token = Jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
        isLeader: savedUser.isLeader,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    const user0 = savedUser._doc;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "signed in successfully", user0 });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  console.log(req.body);

  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return next(
      errorHandler(400, "all fields are required, check your input fields")
    );
  }

  try {
    const validUser = await User.findOne({ emailOrPhone });
    if (!validUser) {
      next(errorHandler(400, "user not found"));
      return;
    }

    const validPassword = await argon2.verify(validUser.password, password);
    console.log(validPassword);
    if (!validPassword) {
      next(errorHandler(400, "wrong password"));
      return;
    }

    const token = Jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
        isLeader: validUser.isLeader,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    const user1 = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "signed in successfully", user1 });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  console.log(req.body);
  const { emailOrPhone } = req.body;
  if (!emailOrPhone) {
    return next(
      errorHandler(400, "all fields are required, check your input fields")
    );
  }

  try {
    const validUser = await User.findOne({ emailOrPhone });
    if (!validUser) {
      return next(errorHandler(400, "user not found"));
    }

    console.log(validUser);
    const newPassword = crypto.randomBytes(8).toString("hex");

    // Hash the new password
    const hashedPassword = await argon2.hash(newPassword);

    // Update the user's password in the database
    validUser.password = hashedPassword;
    const savedUser = await validUser.save();

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.DOMAIN,
      },
    };

    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    //Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: emailOrPhone,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
      <p>Hi bro! 💀 🤓👇 The following is your new created password: 👇</p>
      <h2>${newPassword}</h2>
      <p>Please log in and change your password immediately.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
`,
    };

    //Send the email
    nodemailerMailgun.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({
        success: true,
        message: "Email sent to ",
        emailSentTo: emailOrPhone,
        newPass: newPassword,
        user: savedUser,
      });
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  console.log(req.body);

  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ emailOrPhone: email });
    if (user) {
      const token = Jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isLeader: user.isLeader,
        },

        process.env.JWT_SECRET,
        { expiresIn: "365d" }
      );
      const user3a = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "signed in successfully", user3a });
    } else {
      const generatedPassword = crypto.randomBytes(8).toString("hex");

      // Hash the new password
      const hashedPassword = await argon2.hash(generatedPassword);

      const nameParts = name.split(" ");
      const firstName =
        nameParts[0] || `user${crypto.randomBytes(2).toString("hex")}`;
      const lastName =
        nameParts.length > 1
          ? nameParts.slice(1).join("")
          : `user${crypto.randomBytes(2).toString("hex")}`;

      const newUser = new User({
        firstName,
        lastName,
        userName:
          name.toLowerCase().split(" ").join("") +
          crypto.randomBytes(4).toString("hex"),
        emailOrPhone: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      const savedUser = await newUser.save();

      const token = Jwt.sign(
        {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
          isLeader: savedUser.isLeader,
        },

        process.env.JWT_SECRET,
        { expiresIn: "365d" }
      );

      const user3b = savedUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "signed in successfully", user3b });
    }
  } catch (error) {
    next(error);
  }
};
