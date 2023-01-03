const express = require("express");
const { getAllUser, getUserById, updateProfileBidder, changedStatus } = require("../controllers/UserController.js");
// const { deleteUser, findAllUser, findByUserID, updateUser } = require("'../controllers/user.js");
const { verifyAdmin, verifyToken, verifySeller } = require("../utils/verifyToken.js");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in");
});

router.get("/checkseller/:id", verifySeller, (req, res, next) => {
    res.send("hello seller");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("hello admin");
});

router.get("/getAll/:role/:index/:status/:email", getAllUser);

router.get("/:userId", getUserById);

router.put("/updateProfile/:id",upload.fields([
    {
        name: "cardFront",
        maxCount: 1,
    },
    {
        name: "cardBack",
        maxCount: 1,
    },
]), updateProfileBidder);

router.put("/changeStatus/:userId",changedStatus );

module.exports = router;
