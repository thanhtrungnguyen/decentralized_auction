const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js");
const express = require("express");
const {
    createNews,
    updateNews,
    changeStatusNews,
    getAllNews,
    filterNews,
    getByStatus,
    getNewsById,
    sortNews,
} = require("../controllers/NewsController.js");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/createNews",upload.fields([
    {
        name: "avatar",
        maxCount: 1,
    }])
    , createNews);

router.put("/updateNews/:id",upload.fields([
    {
        name: "avatar",
        maxCount: 1,
    }]),
     updateNews);

router.put("/changeStatusNews/:id", changeStatusNews);

router.get("/getAll/:index/:status/:title/:perPage", getAllNews);

// router.get("/search", filterNews);

// router.get("/:status/:index", getByStatus);

router.get("/getById/:id", getNewsById);

// router.get("/sort/:index/:type", sortNews);

module.exports = router;
