import express from "express";
import userRouter from "./routes/user.routes.js"
import db from "./db/index.js";
import { usersTable,userSession } from "./db/schema.js"
import { eq } from "drizzle-orm";


const app=express();
const PORT=process.env.PORT||8000;

//In built middlewear..
app.use(express.json());
//Custom for auth middlewear..
app.use(async(req,resp,next)=>{
    const sessionId=req.headers['session-id'];
    if(!sessionId){
        return next();
    }
     const [data]=await db.select(
        {sessionId:userSession.id,
         id:usersTable.id,
          userId:userSession.userId,
          name:usersTable.name,
          email:usersTable.email
        }
    ).from(userSession).rightJoin(usersTable,eq(usersTable.id,userSession.userId)).where((table)=>eq(table.sessionId,sessionId));

    if(!data){
        return next();
    }
    req.user=data;

    next();
})


app.get("/",(req,resp)=>{
    
    return resp.json({"Message":"Server Says Hello World..!"});
})

app.use("/user",userRouter);

app.listen(PORT,()=>{console.log("Server Running On : - "+PORT)});