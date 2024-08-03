import express from "express";
import {
  forgotPassword,
  signIn,
  signUp,
} from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgotpassword", forgotPassword);

export default router;
