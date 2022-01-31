import { createProduct, deleteProduct, fetchProducts, fetchSingleProduct, updateProduct } from "./controllers/products.controller.js";
import { loginUser, registerUser } from "./controllers/user.controller.js";
import { isAdminAuth, isUserAuth } from "./middleware/authorization.middleware.js";
import ValidateResource from "./middleware/ValidateResource.js";
import { createUserValidation, loginUserValidation } from "./validation/user.validation.js";

 const routes=(app)=>{
   //  Server Health Check

     app.get("/healthcheck", (req, res) => {
        return res.sendStatus(200)
     });

   //   REST API's endpoints

   //  User Authentication
     app.post("/api/createuser", ValidateResource(createUserValidation) , registerUser);
     app.post("/api/loginuser", ValidateResource(loginUserValidation), loginUser );

   // Products Fetching & Creation
     app.post('/api/products', isAdminAuth, createProduct);
     app.get("/api/products",isUserAuth,fetchProducts);

   // CRUD Operations with respective middleware 
     app.get('/api/product/:id',isUserAuth, fetchSingleProduct) //fetching single product
     app.put('/api/product/:id',isAdminAuth,updateProduct) //updating single product
     app.delete('/api/product/:id', isAdminAuth,  deleteProduct) // deleting single product
   
}

export default routes;