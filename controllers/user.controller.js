import userModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/jwt.util.js";

export const registerUser = asyncHandler(async(req, res) => {

  const { username, email, password, profilePic, admin} = req.body;

  const ifUserExist = await userModel.findOne({ email });

  if(ifUserExist){
    res.status(400).json({errorMessage :"invalid email or password please check and try again!" })
  }

  const user = await userModel.create({
    username,
    email,
    password,
    profilePic,
    admin,
  });

  const token = generateToken(user._id)

  if (user) {
    res.json({
      _id:user._id,
      username: user.username, 
      email: user.email,
      admin:user.admin,
      profilePic:user.profilePic,
      token:token,
    });
    

  } else {

    res.status(500).json({message: "an error occurred while processing your request, please try again "});
  }

});

export const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  const token = generateToken(user._id)

  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      username: user.username,
      email: user.email,
      profilePic:user.profilePic,
      admin:user.admin,
      token:token,

    });

  } else {
    res.status(400).json({errorMessage :"invalid email or password please check and try again!" })
  }

});

export const passwordReset= asyncHandler(async(req, res) => {
     const { email,} = req.body;

     const userExist = await userModel.findOne({email})

     if(userExist){
       res.json({message: "A reset password link has been sent to your email"});
       await SendGridHelper.sendPasswordResetEmail(email);
     }else{
      res.status(400)
      
     }
});
