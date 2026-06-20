import {z} from "zod";

export const signupPostRequestSchema=z.object({
    firstname:string(),
    lastname:string().optional(),
    email:string().email(),
    password:string().min(3),
})