const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js");
const express = require("express");
const { createNews, updateNews, changeStatusNews, getAllNews, filterNews, getByStatus, getNewsById, sortNews } = require("../controllers/NewsController.js");
const router = express.Router();

router.post("/createNews",  createNews);

router.put("/updateNews/:id",  updateNews);

router.put("/changeStatusNews/:id",  changeStatusNews);

router.get("/getAll/:index/:status/:title",  getAllNews);

router.get("/search",  filterNews);

router.get("/:status/:index",  getByStatus);

router.get("/:id",getNewsById);

router.get("/sort/:index/:type",sortNews);

module.exports = router;
