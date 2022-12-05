
const  conn  = require("../server.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

 const getAllAccount = async (req, res, next) => {
  try {
    if (conn) {
      await conn.sobject('Account').find({}).execute((err, result) => {
        if (err) {
          next(err)
        } else {
          console.log("Total records" + result.totalSize)
          res.status(200).json(result);
        }
      })
    } else {
      console.log("Connection failed with salesforce");
    }

  } catch (error) {
    next(error);
  }
}


 const getAccountById = async (req, res, next) => {
  try {
    if (conn) {
      await conn.sobject('Account').find({}).execute((err, result) => {
        if (err) {
          next(err)
        } else {
          console.log("Total records" + result.totalSize)
          res.status(200).json(result);
        }
      })
    } else {
      console.log("Connection failed with salesforce");
    }

  } catch (error) {
    next(error);
  }
}

module.exports = {getAccountById,getAllAccount}