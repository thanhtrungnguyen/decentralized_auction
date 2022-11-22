import express from "express";
import {
  addRole,
  changethepassword,
  login,
  logout,
  register,
} from "../controllers/AuthController.js";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

// router.post("/register", register);
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

router.post("/role", addRole);

router.post("/logout", logout);

router.put("/changethepassword", changethepassword);

export default router;
