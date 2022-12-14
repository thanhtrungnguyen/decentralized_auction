const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js");
const express = require("express");
const { createNews, updateNews, changeStatusNews, getAllNews, filterNews, getByStatus, countNews } = require("../controllers/NewsController.js");
const router = express.Router();

router.post("/createNews",  createNews);

router.put("/updateNews/:id",  updateNews);

router.put("/changeStatusNews/:id",  changeStatusNews);

router.get("/:index",  getAllNews);

router.get("/:title/:status/:index",  filterNews);

router.get("/:status/:index",  getByStatus);

module.exports = router;
