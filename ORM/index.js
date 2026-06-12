const db = require("./db");
require("dotenv/config");
const {usersTable}=require("./drizzle/schema.js");

async function getUsers(){
    const users=await db.select().from(usersTable);

    console.log("User Are : -  ",users);
    return users;
}
async function putUsers({id,name,email}){
    await db.insert(usersTable).values({
        id,
        name,
        email
    })
}

// putUsers({id:1,name:"Kartik",email:"xyz@gmail.com"});

getUsers();