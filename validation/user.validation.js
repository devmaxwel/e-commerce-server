import { object, string } from "zod";

export const createUserValidation = object({
    body:object({
        
            username:string({
                required_error:"username is required"
            }),
            
            password:string({
                required_error:"Password is required"
            }).min(6, "Password is too short, Password must be 6 chars and above"),
    
            email:string({
               required_error:"Email is required"
            }).email("email provided is invalid type of email please check and retry")
        
    })
});


export const loginUserValidation = object({

    body:object({
           
            email:string({
                required_error:"Email is required"
            }),
            
            password:string({
                required_error:"Password is required"
            })
    })
});