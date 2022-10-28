import express from "express";
import { addRole, login, register } from "../controllers/AuthController.js";




const router = express.Router();



router.post("/register",register);
router.post("/login",login);

router.post("/role",addRole);





export default router;

