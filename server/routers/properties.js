const express = require("express")
const {
    createCate,
    createProperty,
    findPropertyByID,
    getAllCate,
    getAllPropertyByUser,
    updateProperty,
} = require("../controllers/PropertyController.js")
const { verifyAdmin, verifySeller, verifyToken } = require("../utils/verifyToken.js")
const multer = require("multer")

const upload = multer({ dest: "uploads/" })

const router = express.Router()

router.post(
    "/",
    verifySeller,
    upload.fields([
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
    ]),
    createProperty
)

router.put("/:id", verifySeller, updateProperty)

router.get("/:id", findPropertyByID)

router.get("/", verifySeller, getAllPropertyByUser)

router.post("/category/", verifyAdmin, createCate)

router.get("/category/", getAllCate)

module.exports = router
