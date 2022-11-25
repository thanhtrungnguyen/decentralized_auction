import express from "express";

import {changePassword, forgotPassword, login, logout, register, resetPassword } from "../controllers/AuthController.js";
import { getAllAccount } from "../controllers/AccountController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

//  router.post("/register", register);
router.post(
  "/register",
  upload.fields([
    {
      name: "cardFront",
      maxCount: 1,
    },
    {
      name: "cardBack",
      maxCount: 1,
    },
  ]),
  register
);
router.post("/login", login);

//router.post("/role", addRole);

router.get("/account",getAllAccount);

router.post("/logout", logout);

router.put("/changePassword", changePassword);

router.post("/forgotPassword",forgotPassword);

router.post("/reset-password/:id/:token",resetPassword);

export default router;
