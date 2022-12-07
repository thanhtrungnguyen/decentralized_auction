const express = require("express");

const {
    changePassword,
    forgotPassword,
    login,
    logout,
    register,
    resetPassword,
    registerSeller,
    registerManager,
} = require("../controllers/AuthController.js");
const { getAllAccount } = require("../controllers/AccountController.js");
const multer = require("multer");
const { verifyAdmin } = require("../utils/verifyToken.js");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

//  router.post("/register", register);
router.post(
    "/register",
    upload.fields([
        {
            name: "cardFront",
            maxCount: 1,
        },
        {
            name: "cardBack",
            maxCount: 1,
        },
    ]),
    register
);
router.post(
    "/registerSeller",
    upload.fields([
        {
            name: "cardFront",
            maxCount: 1,
        },
        {
            name: "cardBack",
            maxCount: 1,
        },
    ]),
    //verifyAdmin,
    registerSeller
);
router.post(
    "/registerManager",
    upload.fields([
        {
            name: "cardFront",
            maxCount: 1,
        },
        {
            name: "cardBack",
            maxCount: 1,
        },
    ]),
    //verifyAdmin,
    registerManager
);
router.post("/login", login);

//router.post("/role", addRole);

router.get("/account", getAllAccount);

router.post("/logout", logout);

router.put("/changePassword", changePassword);

router.post("/forgotPassword", forgotPassword);

router.post("/reset-password", resetPassword);

module.exports = router;
