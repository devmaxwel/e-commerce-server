import { createProduct, fetchProducts } from "./controllers/products.controller.js";
import { loginUser, registerUser } from "./controllers/user.controller.js";
import { productCreationProtection, productViewingProtection } from "./middleware/products.middleware.js";
import ValidateResource from "./middleware/ValidateResource.js";
import { createUserValidation, loginUserValidation } from "./validation/user.validation.js";

 const routes=(app)=>{
   //  Server Health Check

     app.get("/healthcheck", (req, res) => {
        return res.sendStatus(200)
     });

   //   REST API's
  //  User Authentication
     app.post("/api/createuser", ValidateResource(createUserValidation) , registerUser);
     app.post("/api/loginuser", ValidateResource(loginUserValidation), loginUser );

  // Products Fetching and CRUD Operations
     app.post('/api/products', productCreationProtection, createProduct);
     app.get("/api/products",productViewingProtection ,fetchProducts);
         
}

export default routes;