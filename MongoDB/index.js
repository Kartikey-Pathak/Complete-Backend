import "dotenv/config";
import express from "express";
import ConnectDB from "./connection.js";

const app=express();
const PORT=process.env.PORT||8000;

ConnectDB(process.env.MONGODB_URL);




app.listen(PORT,()=>{
    console.log("Server Running.... On",PORT);
})