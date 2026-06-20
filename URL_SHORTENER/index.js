import express from 'express';
const app=express();
const PORT=process.env.PORT||8000;
import userRouter from "./routes/user.routes.js";

app.use(express.json());

app.get("/",(req,resp)=>{
    return resp.json({message:"Server Says Hello World...!"});
})

app.use("/user",userRouter);



app.listen(PORT,()=>{console.log("Server Runing..")});
