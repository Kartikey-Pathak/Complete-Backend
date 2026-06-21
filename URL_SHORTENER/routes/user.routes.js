import express from "express";
import db from '../db/index.js';
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto"
import { json } from "node:stream/consumers";
import { signupPostRequestSchema } from "../validations/request.validation.js";

const router = express.Router();

router.post("/signup", async (req, resp) => {
    const validation = await signupPostRequestSchema.safeParseAsync(req.body);
    if (validation.error) {
        return resp.status(400).json({ error: validation.error.format() });
    }

    const { name, email, password } = validation;


    const [exist] = await db.select({
        id: usersTable.id
    }).from(usersTable).where(eq(usersTable.email, email));

    if (exist) {
        return resp.status(400).json({ error: "Email Exists...!" });
    }

    const salt = randomBytes(256).toString("hex");
    const hashpassword = createHmac("sha256", salt).update(password).digest('hex');

    const [user] = await db.insert(usersTable).values({
        name,
        email,
        password: hashpassword,
        salt

    }).returning({ id: usersTable.id });

    return resp.status(201), json({ message: "user saved" }, user);
})


export default router;