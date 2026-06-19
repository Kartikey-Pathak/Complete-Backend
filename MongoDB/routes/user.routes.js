import express from "express";
import User from "../models/user.models.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";
import "dotenv/config";

const router = express.Router();


router.patch("/",ensureAuthenticated,async(req,resp)=>{
    const {name}=req.body;
    await User.findByIdAndUpdate(req.user._id,{name});

    return resp.status(201).json({message:"User Name Updated..."});
    

})



router.post("/signup", async (req, resp) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({
        email
    });

    if (exists) {
        return resp.status(400).json({ error: "Email Exists..." });
    }

    const salt = randomBytes(256).toString('hex');
    const hashpassword = createHmac('sha256', salt).update(password).digest('hex');

    const user = await User.insertOne({
        name,
        email,
        password: hashpassword,
        salt
    })

    return resp.status(201).json({ message: "User Saved", data: user });
});

router.post("/login", async (req, resp) => {
    const { email, password } = req.body;

    const exists = await User.findOne({
        email
    });

    if (!exists) {
        return resp.status(404).json({ error: "Email Not Found..." });
    }

    const salt = exists.salt;

    const hashpassword = exists.password;

    const newhash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashpassword !== newhash) {
        return resp.status(400).json({ error: "Invalid Password sir...!" });
    }

    const payload = {
        name: exists.name,
        _id: exists._id,
        email: exists.email
    };

    console.log("JWT_SECRET =", process.env.JWT_SECRET);
    console.log("payload =", payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return resp.status(201).json({ message: "Success", token });
})



export default router;