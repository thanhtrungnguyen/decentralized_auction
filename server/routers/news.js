const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js");
const express = require("express");
const { createNews, updateNews, changeStatusNews, getAllNews, filterNews, getByStatus } = require("../controllers/NewsController.js");
const router = express.Router();

router.post("/createNews",  createNews);

router.put("/updateNews/:id",  updateNews);

router.put("/changeStatusNews/:id",  changeStatusNews);

router.get("/",  getAllNews);

router.get("/:title/:status",  filterNews);

router.get("/:status",  getByStatus);
module.exports = router;
