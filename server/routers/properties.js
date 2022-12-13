const express = require("express");
const {
    createCate,
    createProperty,
    findPropertyByID,
    getAllCate,
    getAllPropertyByUser,
    updateProperty,
    getListByStatus,
    getListByName,
    filterProperty,
} = require("../controllers/PropertyController.js");
const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
    "/",
    verifySeller,
    upload.fields([
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
    ]),
    createProperty
);

router.put("/:id", verifySeller, updateProperty);

router.get("/:id", findPropertyByID);

router.get("/getListByStatus/:status", getListByStatus);

router.get("/getListByName/:name/:status", filterProperty);

router.get("/", verifySeller, getAllPropertyByUser);

// router.get("/category/", getAllCate);

// router.post("/category/", verifyAdmin, createCate);

module.exports = router;
