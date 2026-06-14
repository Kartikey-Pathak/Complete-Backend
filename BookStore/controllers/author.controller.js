const authorsTable=require("../models/author.model");
const db=require("../db/index");
const booksTable = require("../models/book.model");
const { eq } = require("drizzle-orm");

exports.getallauthors=async (req,resp)=>{
    const data=await db.select().from(authorsTable);
    resp.json(data);
}

exports.createauthor=async (req,resp)=>{
    const {firstName,lastName,email}=req.body;
    const [result]=await db.insert(authorsTable).values({
        firstName,
        lastName,
        email
    }).returning({id:authorsTable.id});

     return resp.status(201).json({Message:"author Saved...!!",id:result.id});
}

exports.getbooksbyid=async (req,resp)=>{
    const id=req.params.id
     
    const book=await db.select().from(booksTable).where(eq(booksTable.authorId,id));
    

     return resp.status(201).json(book);
}