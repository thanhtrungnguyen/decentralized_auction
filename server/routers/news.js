const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js");
const express = require("express");
const { createNews, updateNews, changeStatusNews, getAllNews, filterNews, getByStatus, countNews } = require("../controllers/NewsController.js");
const router = express.Router();

router.post("/createNews",  createNews);

router.put("/updateNews/:id",  updateNews);

router.put("/changeStatusNews/:id",  changeStatusNews);

router.get("/:index/:status/:title",  getAllNews);

router.get("/search",  filterNews);

router.get("/:status/:index",  getByStatus);

module.exports = router;
