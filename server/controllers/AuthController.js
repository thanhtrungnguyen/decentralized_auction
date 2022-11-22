import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";
import RoleRight from "../models/RoleRight.js";
import { createError } from "../utils/error.js";
import Contact from "../models/Contact.js";
import { uploadFile } from "../s3.js";

//define role
const BIDDER = "BIDDER";
const SELLER = "SELLER";
const ADMIN = "ADMIN";
const CONTACT = "CONTACT";
const ACCOUNT = "ACCOUNT";

//register new User
export const register = async (req, res, next) => {
  try {
    if (req.body.usertype === CONTACT) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        UserName: req.body.username,
        PassWord: hash,
      });
      await newUser.save();

      const user = await User.findOne({
        UserName: req.body.username,
      });
      const files = req.files;
      console.log(files);

      const result = await uploadFile(files.cardFront[0]);
      console.log(result);

      const result1 = await uploadFile(files.cardBack[0]);
      console.log(result1);
      let date_ob = new Date(req.body.dateOfBirth);
      let date = date_ob.getDate();
      let month = date_ob.getMonth();
      let year = date_ob.getFullYear();
      let dategrantedcard = new Date(req.body.dateRangeCard);
      const contact = new Contact({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Gender: req.body.gender,
        Email: req.body.email,
        DayOfBirth: date,
        MonthOfBirth: month,
        YearOfBirth: year,
        Wards: req.body.wardId,
        City: req.body.cityId,
        District: req.body.districtId,
        Address: req.body.sepecificAddress,
        CardNumber: req.body.cardNumber,
        CardGrantedDate: dategrantedcard,
        CardGrantedPlace: req.body.cardGrantedPlace,
        FontSideImage: req.body.cardfront,
        BackSideImage: req.body.cardback,
        UserId: user._id,
      });

      await contact.save();

      const role = await Role.findOne({
        RoleName: req.body.role,
      });

      const roleright = new RoleRight({
        UserId: user._id,
        RoleId: role._id,
      });
      await roleright.save();
    }

    res.status(200).send("User has been created.");
  } catch (error) {
    next(error);
  }
};

//roles: tạo hàm để tiện insert role mặc dù ko dùng

export const addRole = async (req, res, next) => {
  try {
    const role = new Role({
      RoleName: req.body.RoleName,
    });
    await role.save();
    res.status(200).send("Role has been created.");
  } catch (error) {
    next(error);
  }
};

//login

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ UserName: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.PassWord
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!!"));

    const roleright = await RoleRight.findOne({
      UserId: user._id,
    });
    const role = await Role.findById(roleright.RoleId);

    const token = jwt.sign(
      { id: user._id, role: role.RoleName },
      process.env.JWT
    );

    const { PassWord, ...ortherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...ortherDetails, role: role.RoleName });
  } catch (error) {
    next(error);
  }
};

//change the password

export const changethepassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ UserName: req.body.username });
    const isOldPasswordCorrect = await bcrypt.compare(
      req.body.oldpassword,
      user.PassWord
    );
    if (!isOldPasswordCorrect)
      return next(createError(400, "Wrong old password !!"));

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.newpassword, salt);

    await User.updateOne(
      { _id: user._id },
      { $set: { PassWord: hash } },
      { new: true }
    );

    res.status(200).json(updatedUser);
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
