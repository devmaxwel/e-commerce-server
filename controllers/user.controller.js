import userModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/jwt.util.js";

export const registerUser = asyncHandler(async(req, res) => {

  const { username, email, password, profilePic, admin} = req.body;

  const ifUserExist = await userModel.findOne({ email });

  if (ifUserExist) {
    res.sendStatus(409);
    throw new Error("email you just provided is alreaady in use, please check again or use another one ");
  }

  const user = await userModel.create({
    username,
    email,
    password,
    profilePic,
    admin
  });

  if (user) {
    res.json({
      _id:user._id,
      username: user.username, 
      email: user.email,
      admin:user.admin,
      profilePic:user.profilePic,
      token:generateToken(user._id)
    });

  } else {

    throw new Error("Internal Server Error ");
  }

});


export const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      username: user.username,
      email: user.email,
      profilePic:user.profilePic,
      admin:user.admin,
      token:generateToken(user._id)

    });

  } else {
    res.sendStatus(400)
    throw new Error("inavalid email or password please check and try again");
  }

});