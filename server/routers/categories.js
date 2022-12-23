const express = require("express");
const { createCate, getAllCate, updateCategory, changedStatus, getCategoryById } = require("../controllers/CategoryController.js");
const { verifyManager } = require("../utils/verifyToken.js");

const router = express.Router();

router.post("/", verifyManager, createCate);

router.get("/getAll/:index/:status/:name", getAllCate);

router.get("/getById/:id",verifyManager,getCategoryById);

router.put("/update/:id",updateCategory);

router.put("/changeStatus/:id",changedStatus);



module.exports = router;
