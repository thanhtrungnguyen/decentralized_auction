import express from "express";
import { createCate, createProperty, findPropertyByID, getAllCate, getAllPropertyByUser, updateProperty } from "../controllers/PropertyController.js";
import { verifyAdmin, verifySeller, verifyToken } from "../utils/verifyToken.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();



router.post("/", verifySeller, upload.fields([
    {
      name: "propertyImage0",
      maxCount: 1,
    },
    {
      name: "propertyImage1",
      maxCount: 1,
    },
    {
        name: "propertyImage2",
        maxCount: 1,
      },
    {
        name: "propertyImage3",
        maxCount: 1,
    },
    {
        name: "propertyVideo",
        maxCount: 1,
    },
  ]) ,createProperty);

router.put("/:id", verifySeller ,updateProperty);

router.get("/:id",findPropertyByID);

router.get("/",verifySeller,getAllPropertyByUser)

router.post("/category/", verifyAdmin ,createCate);

router.get("/category/",  getAllCate);








export default router