import express from "express";
const app=express();
const PORT=process.env.PORT||8000;


app.get("/",(req,resp)=>{
    
    return resp.json({"Message":"Server Says Hello World..!"});
})

app.listen(PORT,()=>{console.log("Server Running On : - "+PORT)});