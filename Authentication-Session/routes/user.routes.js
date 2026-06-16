import express from "express";
import db from "../db/index.js";
import { usersTable, userSession } from "../db/schema.js"
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto"


const userRouter = express.Router();

//update user
userRouter.patch("/", async (req, resp) => {
    const user = req.user;
    const { name } = req.body;
    if (!user) {
        return resp.status(401).json({ error: "You Are Not Login..." })
    }

    await db.update(usersTable).set({name}).where(eq(usersTable.id,user.id));

    return resp.status(201).json({Message:"Success User Updated...."});


})

userRouter.get("/", async (req, resp) => {
    const user = req.user;
    if (!user) {
        return resp.status(401).json({ error: "You Are Not Login..." })
    }
    return resp.json({ user });

})

userRouter.post("/signup", async (req, resp) => {
    const { name, email, password } = req.body;

    const [exists] = await db.select().from(usersTable).where((table) => eq(table.email, email));

    if (exists) {
        return resp.status(400).json({ error: "Email Exists" });
    }

    const salt = randomBytes(256).toString('hex');
    const hashed = createHmac('sha256', salt).update(password).digest('hex');

    const [user] = await db.insert(usersTable).values({
        name,
        email,
        password: hashed,
        salt,
    }).returning({ id: usersTable.id });

    return resp.status(201).json({ Message: "User Saved", data: user });

});


userRouter.post("/login", async (req, resp) => {
    const { email, password } = req.body;

    const [exists] = await db.select({ id: usersTable.id, email: usersTable.email, password: usersTable.password, salt: usersTable.salt }).from(usersTable).where((table) => eq(table.email, email));

    console.log(exists);

    if (!exists) {
        return resp.status(400).json({ error: "Email does not Exists ...!" });
    }

    const salt = exists.salt;
    const existhash = exists.password;

    const newhash = createHmac('sha256', salt).update(password).digest('hex');

    if (newhash !== existhash) {
        return resp.status(400).json({ error: "Wrong password sir...." })
    }


    const [session] = await db.insert(userSession).values({
        userId: exists.id
    }).returning({ id: userSession.id })

    return resp.json({ Message: "Session Generated....", Sessionid: session.id })
});



export default userRouter;