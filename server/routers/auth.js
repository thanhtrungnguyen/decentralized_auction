import express from "express";
import { addRole, changethepassword, login, logout, register } from "../controllers/AuthController.js";




const router = express.Router();



router.post("/register",register);

router.post("/login",login);

router.post("/role",addRole);

router.post("/logout",logout)

router.put("/changethepassword",changethepassword);






export default router;

