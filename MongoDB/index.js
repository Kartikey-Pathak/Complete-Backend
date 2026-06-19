import "dotenv/config";
import express from "express";
import ConnectDB from "./connection.js";
import UserRouter from "./routes/user.routes.js"
import { authMiddleware } from "./middleware/auth.middleware.js";

const app=express();
const PORT=process.env.PORT||8000;

//Middlewear...
app.use(express.json());
//authentication middlewear..
app.use(authMiddleware);


ConnectDB(process.env.MONGODB_URL).then(()=>{console.log("MongoDB Connected....")});

app.use("/user",UserRouter);



app.listen(PORT,()=>{
    console.log("Server Running.... On",PORT);
})