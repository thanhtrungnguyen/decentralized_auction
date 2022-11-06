import express from "express";
import { createCate, createProperty, findPropertyByID, getAllCate, updateProperty } from "../controllers/PropertyController.js";
import { verifyAdmin, verifySeller } from "../utils/verifyToken.js";


const router = express.Router();



router.post("/", verifySeller ,createProperty);

router.put("/:id", verifySeller ,updateProperty);

router.get("/:id",findPropertyByID);

router.post("/category/", verifyAdmin ,createCate);

router.get("/category/",  getAllCate);








export default router