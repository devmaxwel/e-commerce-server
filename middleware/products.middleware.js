import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/user.model.js'


export const productCreationProtection = asyncHandler(async(req, res, next) => {

    let authorizationToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            authorizationToken = req.headers.authorization.split(" ")[1]

            // jwt.verify(token, secretkey, [options, callback])
            const decode = jwt.verify(authorizationToken, process.env.PRIVATE_KEY)
          
            req.user = await userModel.findOne({ _id: decode.id }).select('admin')

            // Check if admin field is true
            if (!req.user.admin) {
               return res.sendStatus(401)
            }
             next();           
            
        } catch (error) {
            throw new Error(error)
        }
    }
 

    if(!authorizationToken){
        res.sendStatus(401)
        throw new Error("Authenication failed")
    }
   
});


export const productViewingProtection = asyncHandler(async(req, res, next) => {
    let authorizationToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         try {
            authorizationToken = req.headers.authorization.split(" ")[1]

            const decodeUser = jwt.verify(authorizationToken, process.env.PRIVATE_KEY)
            req.user = await userModel.findById(decodeUser.id).select('-password')
            next();
         } catch (error) {
             res.sendStatus(401)
             throw new Error(error)
         }
    }

    if(!authorizationToken){
        throw new Error("Authenication failed")
    }
         
});