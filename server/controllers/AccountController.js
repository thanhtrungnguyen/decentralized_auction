
import { conn } from "../server.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getAllAccount = async (req, res, next) => {
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

export const createAccount = async (req, res, next) => {
  try {
    if (conn) {
      var user,role,contact = null;
      if (req.body.usertype === "ACCOUNT") {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
      };
      // create user
      await conn.sobject("User__c").create({
        Name: req.body.username,
        Password__c: hash,
      }, (err, result) => {
        if (err) { return console.error(err, result); }
        user = result.id
        console.log("Created record id : " + result.id);
      })
      // create information contact
      await conn.sobject("Contact__c").create({
        First_Name__c: req.body.firstName,
        Last_Name__c: req.body.lastName,
        Gender__c: req.body.gender,
        Email__c: req.body.email,
        BirthDate__c: req.body.dateOfBirth,
        Phone__c: req.body.phone,
        Wards__c: req.body.wardId,
        City__c: req.body.cityId,
        District__c: req.body.districtId,
        Address__c: req.body.specificAddress,
        Card_Number__c: req.body.cardNumber,
        Card_Granted_Date__c: req.body.dateRangeCard,
        Card_Granted_Place__c: req.body.cardGrantedPlace,
        // Font_Side_Image__c: result.key,
        // Back_Side_Image__c: result.key,
        User_Id__c: user,
      }, (err, result) => {
        if (err) { return console.error(err, result); }
        contact = result.id
        console.log("Created contact : " + result);

      })
      
      // create information account
      await conn.sobject('Account__c').create({
        Name: req.body.organizationName,
        Company_Certificate__c: req.body.certificateCompany,
        //Employees__c:
        //Phone__c: 
        Specific_Address__c: req.body.specificAddressOrganization,
        Tax__c: req.body.taxCode,
        Tax_Code_Granted_Date__c: req.body.taxCodeGrantedDate,
        Tax_Code_Granted_Place__c: req.body.taxCodeGrantedPlace,
        //Website__c:
        User_Id__c: user,
        Contact_DAP__c: contact
      }, (err, result) => {
        if (err) return console.error(err)

        console.log("Created account id : " + result.id);
      })


      // add role
      await conn.sobject("Role__c").findOne({
        Name: req.body.role,
      }, (err, result) => {
        if (err) { return console.error(err, result); }
        else {
          role = result.Id
          console.log("Role Id : " + result.Id);
        }
      })
      await conn.sobject("Role_Right__c").create({
        Role_Id__c: role,
        User_DAP__c: user
      }, (err, result) => {
        if (err || !result.success) { return console.error(err, result); }
        console.log("Created role right : " + result);
      })

      res.status(200).send("User has been created.");

    } else {
      console.log("Connection failed with salesforce");
    }
  } catch (error) {
    next(error)
  }
}
export const getAccountById = async (req, res, next) => {
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

