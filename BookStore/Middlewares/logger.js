const fs=require("fs");

exports.loggermiddleware=function(req,resp,next){
    console.log("I am a middlewear...");
    // next();  //allow next methods(routes) or middlewears to run.

    // return resp.json({"message":"Middlewear Runned..."})  //this is early return

    const log=`\n [${Date.now()}] ${req.method} ${req.path} `;
    fs.appendFileSync("logs.txt",log,"utf-8");
    
    next();
}