import express from 'express';
// import { deleteUser, findAllUser, findByUserID, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifySeller } from '../utils/verifyToken.js';

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



export default router