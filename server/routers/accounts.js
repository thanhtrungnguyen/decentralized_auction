import express from "express"
import { createAccount } from "../controllers/AccountController.js";

const router = express.Router();

router.post("/",createAccount)

export default router