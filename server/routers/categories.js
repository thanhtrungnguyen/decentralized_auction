const express = require("express");
const { createCate, getAllCate } = require("../controllers/PropertyController.js");
const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();
router.post("/", verifyAdmin ,createCate);

router.get("/",  getAllCate);

module.exports = {router}