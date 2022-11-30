import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";
import RoleRight from "../models/RoleRight.js";
import { createError } from "../utils/error.js";
import Contact from "../models/Contact.js";
import { uploadFile } from "../s3.js";
import { conn } from "../server.js";
import { sendMail } from "../utils/mailer.js"

//define role
const BIDDER = "BIDDER";
const SELLER = "SELLER";
const ADMIN = "ADMIN";
const CONTACT = "CONTACT";
const ACCOUNT = "ACCOUNT";

//register new User
export const register = async (req, res, next) => {

  try {
    var user,contact = null;
    var role = null;
    if(conn){
      if (req.body.usertype === CONTACT) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
  
        // const newUser = new User({
        //   UserName: req.body.username,
        //   PassWord: hash,
        // });
        await conn.sobject("User__c").create({
          Name: req.body.username,
          Password__c: hash,
        }, (err, ret) => {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log("Created record id : " + ret.id);
        })
  
        // await User.findOne({
        //   UserName: req.body.username,
        // });
        await conn.sobject("User__c").findOne({
          Name: req.body.username,
        }, (err, ret) => {
          if (err) { return console.error(err, ret); }
          else {
            user = ret.Id
            console.log("User Name : " + ret.Id);
          }
        })
        //console.log(user)
        // const files = req.files;
        // // console.log("files: " + files);
  
        // const result = await uploadFile(files.cardFront[0]);
        // console.log(result);
  
        // const result1 = await uploadFile(files.cardBack[0]);
        // console.log(result1);
        // let date_ob = new Date(req.body.dateOfBirth);
        // let date = date_ob.getDate();
        // let month = date_ob.getMonth();
        // let year = date_ob.getFullYear();
        // let dategrantedcard = new Date(req.body.dateRangeCard);
        // const contact = new Contact({
        //   FirstName: req.body.firstName,
        //   LastName: req.body.lastName,
        //   Gender: req.body.gender,
        //   Email: req.body.email,
        //   DayOfBirth: date,
        //   MonthOfBirth: month,
        //   YearOfBirth: year,
        //   Wards: req.body.wardId,
        //   City: req.body.cityId,
        //   District: req.body.districtId,
        //   Address: req.body.sepecificAddress,
        //   CardNumber: req.body.cardNumber,
        //   CardGrantedDate: dategrantedcard,
        //   CardGrantedPlace: req.body.cardGrantedPlace,
        //   FontSideImage: req.body.cardfront,
        //   BackSideImage: req.body.cardback,
        //   UserId: user._id,
        // });
  
        await conn.sobject("Contact__c").create({
          First_Name__c: req.body.firstName,
          Last_Name__c: req.body.lastName,
          Gender__c: req.body.gender,
          Email__c: req.body.email,
          Date_Of_Birth__c: req.body.dateOfBirth,
          Phone__c: req.body.phone,
          Wards__c: req.body.wardId,
          City__c: req.body.cityId,
          District__c: req.body.districtId,
          Address__c: req.body.sepecificAddress,
          Card_Number__c: req.body.cardNumber,
          Card_Granted_Date__c: req.body.dateRangeCard,
          Card_Granted_Place__c: req.body.cardGrantedPlace,
          // Font_Side_Image__c: result.key,
          // Back_Side_Image__c: result1.key,
          User_Id__c: user,
        }, (err, ret) => {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log("Created contact : " + ret);
        })
  
  
        //   await contact.save();
  
        await conn.sobject("Role__c").findOne({
          Name: req.body.role,
        }, (err, ret) => {
          if (err) { return console.error(err, ret); }
          else {
            role = ret.Id
            console.log("Role Id : " + ret.Id);
          }
        })
        await conn.sobject("Role_Right__c").create({
          Role_Id__c: role,
          User_DAP__c: user
        }, (err, ret) => {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log("Created role right : " + ret);
        })
  
        //   const role = await Role.findOne({
        //     RoleName: req.body.role,
        //   });
  
        //   const roleright = new RoleRight({
        //     UserId: user._id,
        //     RoleId: role._id, 
        //   });
        //   await roleright.save();
      }
      if (req.body.usertype === ACCOUNT){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        // create user
      await conn.sobject("User__c").create({
        Name: req.body.username,
        Password__c: hash,
      }, (err, result) => {
        if (err) { return console.error(err, result); }
        user = result.id
        console.log("Created record id : " + result.id);
      })
      // const files = req.files;
      //   // console.log("files: " + files);
  
      //   const result = await uploadFile(files.cardFront[0]);
      //   console.log(result);
  
      //   const result1 = await uploadFile(files.cardBack[0]);
      //   console.log(result1);
      // create information contact
      await conn.sobject("Contact__c").create({
        First_Name__c: req.body.firstName,
        Last_Name__c: req.body.lastName,
        Gender__c: req.body.gender,
        Email__c: req.body.email,
        Date_Of_Birth__c: req.body.dateOfBirth,
        Phone__c: req.body.phone,
        Wards__c: req.body.wardId,
        City__c: req.body.cityId,
        District__c: req.body.districtId,
        Address__c: req.body.specificAddress,
        Card_Number__c: req.body.cardNumber,
        Card_Granted_Date__c: req.body.dateRangeCard,
        Card_Granted_Place__c: req.body.cardGrantedPlace,
        // Font_Side_Image__c: result.key,
        // Back_Side_Image__c: result1.key,
        User_Id__c: user,
      }, (err, ret) => {
        if (err) { return console.error(err, ret); }
        contact = ret.id
        console.log("Created contact : " + ret);
        
      })
      
      // create information account
      await conn.sobject('Account__c').create({
        Name: req.body.accountName,
        //Company_Certificate__c: req.body.certificateCompany,
        //Employees__c:
        //Phone__c: 
        Specific_Address__c: req.body.specificAddress,
        Tax_Code__c: req.body.taxCode,
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
      }
    }else {
      console.log("Connection failed with salesforce");
    }
    res.status(200).send("User has been created.");


  } catch (error) {
    next(error);
  }
};

//roles: tạo hàm để tiện insert role mặc dù ko dùng
//1-Bidder, 2- seller, 3- admin
// export const addRole = async (req, res, next) => {
//   try {
//     const role = new Role({
//       RoleName: req.body.RoleName,
//     });
//     await role.save();
//     res.status(200).send("Role has been created.");
//   } catch (error) {
//     next(error);
//   }
// };

//login

export const login = async (req, res, next) => {
  try {
    var user = null;
    var roleRight = null;
    var role = null;
    await conn.sobject('User__c').findOne({ Name: req.body.userName }, (err, ret) => {
      if (err) console.error(err)
      user = ret
    });

    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.Password__c
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!!"));

    await conn.sobject("Role_Right__c").findOne({
      User_DAP__c: user.Id,
    }, (err, ret) => {
      if (err) console.error(err)
      roleRight = ret.Role_Id__c;
    });
    await conn.sobject("Role__c").findOne({
      Id: roleRight
    }, (err, ret) => {
      if (err) console.error(err)
      role = ret.Name //BIDDER
    });

    const token = jwt.sign(
      { id: user.Id, role: role },
      process.env.JWT
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ userId: user.Id, userName: user.Name, role: role, token: token }).send();

    // return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

//change the password

export const changePassword = async (req, res, next) => {
  try {
    var user = null;
    // const user = await User.findOne({ UserName: req.body.username });
    // const isOldPasswordCorrect = await bcrypt.compare(
    //   req.body.oldpassword,
    //   user.PassWord
    // );
    // if (!isOldPasswordCorrect)
    //   return next(createError(400, "Wrong old password !!"));
    await conn.sobject('User__c').findOne({ Name: req.body.userName }, (err, ret) => {
      if (err) console.error(err)
      user = ret
    });

    if (!user) return next(createError(404, "User not found!"));

    const isOldPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.Password__c
    );

    if (!isOldPasswordCorrect)
      return next(createError(400, "Wrong password or username!!"));

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.newPassword, salt);

    await conn.sobject("User__c").update({
      Id: user.Id,
      Password__c: hash
    }, (err, result) => {
      if (err) return console.error(err)
      res.status(200).json(result);
    })
    // await User.updateOne(
    //   { _id: user._id },
    //   { $set: { PassWord: hash } },
    //   { new: true }
    // );


  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Log out successfully!!" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    var user, contact = null;

    // await conn.sobject('Contact__c').findOne({ Email__c: req.body.email },(err,ret)=>{
    //   if(err) console.error(err)
    //   contact = ret
    // });
    await conn.sobject('User__c').findOne({
      Name: req.body.userName
    }, (err, ret) => {
      if (err) console.error(err)
      user = ret
    })
    if (!user) return next(createError(404, "Email not found!"));

    const secret = process.env.JWT + user.Password__c;
    const payload = {
      email: user.Name,
      id: user.Id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '15m' })
    const link = `http://localhost:8800/api/auth/resetPassword/${user.Id}/${token}`;
    console.log(link)

    sendMail(user.Name, "Reset Password", `<a href="${link}"> Reset Password </a>`)
    // var salt = bcrypt.genSaltSync(10);
    // bcrypt.hash(contact.Email__c, parseInt(salt)).then((hashedEmail) => {
    //   sendMail(contact.Email__c, "Reset password", `<a href="${link}"> Reset Password </a>`)
    //   console.log(`${link}`);
    // })
    res.json({
      link: link
    })
    } catch (error) {
    next(error)
  }
}
export const resetPassword = async (req, res, next) => {
  try {
    var user, password1, password2 = null;
    const secret = process.env.JWT + user.Password__c;
    try {
      const payload = jwt.verify(token, secret)
      await conn.sobject('User__c').findOne({
        Name: payload.email
      }, (err, ret) => {
        if (err) console.error(err)
        user = ret
      })
      if (req.body.id !== user) {
        console.log("Invalid user")
        return
      }
      password1 = req.body.password1;
      password2 = req.body.password2;

      if (password1 !== password2) res.status(4).json({ message: "Password must be same" })
      else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password1, salt);
        await conn.sobject("User__c").upsert({
          Id: user.Id,
          Password__c: hash
        },(err,ret)=>{
          if(err) console.error(err)
        })
      }
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    next(err)
  }
}