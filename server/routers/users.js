const express = require("express");
// const { deleteUser, findAllUser, findByUserID, updateUser } = require("'../controllers/user.js");
const { verifyAdmin, verifyToken, verifySeller } = require("../utils/verifyToken.js");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkseller/:id", verifySeller, (req,res,next)=>{
    res.send("hello seller");
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("hello admin");
})



module.exports = router;