import { productModel } from "../models/products.model.js";
import asyncHandler from 'express-async-handler'


export const createProduct=asyncHandler(async(req, res) => {
    const {title, price, description, image, inStock} = req.body
    if(!title || !price || !description || !image || !inStock){
        res.sendStatus(400)
        throw new Error(" All fields are required ")
    }else{
        const product = new productModel({
            user:req.user._id,
            title,
            price,
            description,
            inStock,
            image
        })

        const createdProduct = await product.save();

        if(createdProduct){
            res.json({
                id:createdProduct._id,
                image:createdProduct.image,
                title:createdProduct.title,
                description:createdProduct.description,
                price:createdProduct.price,
                inStock:createdProduct.inStock,
            })
        }
    }
})

 export const fetchProducts =  asyncHandler(async(req, res) => {

//   We want to fetch products created by the organizations responsible person for   craering products into the database, but the best way to do this is by Middleware
      try {
        const products =  await productModel.find()
         res.json(products)
        
      } catch (error) {
          res.send(error.message);
      }
});