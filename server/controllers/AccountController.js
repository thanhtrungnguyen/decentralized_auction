import { query } from "express";
import dotenv from "dotenv";

//import Account from "./models/Account.js";
import jsforce from "jsforce"

dotenv.config();
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL
  })
  
  conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log(res.id)
    }
  })
export const getAllAccount = async (req,res,next) =>{
    try {
        const accounts = await conn.query("Select Id, Name, Phone from Account",(err,result)=>{
            if(err){
                next(err)
            }else{
                console.log("Total records"+result.totalSize)
                res.status(200).json(accounts);
            }
        })
    } catch (error) {
        next(error);
    }
}