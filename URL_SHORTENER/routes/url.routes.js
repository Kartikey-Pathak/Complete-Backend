import express from "express";
import { ShortenPostRequestSchema } from "../validations/request.validation.js";
import db from "../db/index.js";
import { usersTable,urlsTable } from "../models/index.js";
import { nanoid } from "nanoid";

const router=express.Router();


router.post("/shorten",async(req,resp)=>{
    const UserId=req.user?.id;
    if(!UserId){
        return resp.status(401).json({error:"You Must Be Login"});
    }

    const validate=await ShortenPostRequestSchema.safeParseAsync(req.body);
    if(validate.error){
        resp.status(400).json({error:validate.error.message});
    }

    const {url,code}=validate.data;
    const shortCode=code??nanoid(6);

    const [result]=await db.insert(urlsTable).values({
        shortCode,
        targetURL:url,
        userId:req.user.id
    }).returning({
        id:urlsTable.id,
        shortCode:urlsTable.shortCode,
        targetURL:urlsTable.targetURL
    });

    resp.status(201).json({id:result.id,shortCode:result.shortCode,targetURL:result.targetURL});

})




export default router;