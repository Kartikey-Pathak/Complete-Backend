import express from "express";
import userRouter from "./routes/user.routes.js"
import db from "./db/index.js";
import { usersTable, userSession } from "./db/schema.js"
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";


const app = express();
const PORT = process.env.PORT || 8000;

//In built middlewear..
app.use(express.json());

//Custom for auth middlewear..

app.use(async (req, resp, next) => {
    try {
        // const sessionId = req.headers['session-id'];
        const tokenheader = req.headers['authorization'];
        //HEADER authorization: Bearer <TOKEN>
        // if (!sessionId) {
        //     return next();
        // }

        if (!tokenheader) {
            return next();
        }
        if (!tokenheader.startsWith('Bearer')) {
            return resp.status(400).json({ error: "authorization must start with Bearer..." })
        }

        const token = tokenheader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);




        // // const [data] = await db.select(
        // //     {
        // //         sessionId: userSession.id,
        // //         id: usersTable.id,
        // //         userId: userSession.userId,
        // //         name: usersTable.name,
        // //         email: usersTable.email
        // //     }
        // // ).from(userSession).rightJoin(usersTable, eq(usersTable.id, userSession.userId)).where((table) => eq(table.sessionId, sessionId));

        // if (!data) {
        //     return next();
        // }


        req.user = decoded;  //No Database Call......
        next();
    } catch (error) {    //to handle the error when token changed by someone..
        console.log(error);
        next();
    }
})


app.get("/", (req, resp) => {

    return resp.json({ "Message": "Server Says Hello World..!" });
})

app.use("/user", userRouter);

app.listen(PORT, () => { console.log("Server Running On : - " + PORT) });