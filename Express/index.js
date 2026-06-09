const express=require("express");

const app=express(); //function that returns an application object

app.get("/",(req,resp)=>{
    console.log("Server Works !!");

    resp.status(201).end("Hello Sir !!..");
});

app.listen(7000);