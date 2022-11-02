import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";
import RoleRight from "../models/RoleRight.js";
import { createError } from "../utils/error.js";

//define role
const BIDDER = "BIDDER";
const SELLER = "SELLER";
const ADMIN = "ADMIN";

//register new User
export const register = async (req, res, next) => {
  try {
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

    const role = await Role.findOne({
      RoleName: req.body.role,
    });

    const roleright = new RoleRight({
      UserId: user._id,
      RoleId: role._id,
    });
    await roleright.save();

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
    console.log(req.body.username);
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
