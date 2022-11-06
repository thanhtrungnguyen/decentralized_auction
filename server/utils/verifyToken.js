import jwt from "jsonwebtoken";
import { createError } from "./error.js";

//define role
const BIDDER = "BIDDER";
const SELLER = "SELLER";
const ADMIN = "ADMIN";


//verify access_token
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated!"));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token is not valid!"));
        req.user = user;
        next()
    })
}
//check author Seller 
export const verifySeller = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if( req.user.role === SELLER ){
            next()
        }else{
           return next(createError(403,"you are not authorized!"))
        }
    })
}

//check author Admin
export const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if( req.user.role == ADMIN){
            next()
        }else{
           return next(createError(403,"you are not authorized!"))
        }
    })
}
export const verifyBidder = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id && req.user.role == BIDDER ){
            next()
        }else{
           return next(createError(403,"you are not authorized!"))
        }
    })
}