import express from "express";
import { createCate, getAllCate } from "../controllers/PropertyController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", verifyAdmin ,createCate);

router.get("/",  getAllCate);

export default router