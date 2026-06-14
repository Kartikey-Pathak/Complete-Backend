const booksTable=require("../models/book.model");
const db=require("../db/index");
const { eq } = require("drizzle-orm");

exports.getallbooks =async (req, resp) => {
    const data = await db.select().from(booksTable);
    resp.json(data);
}

exports.getallbooksbyid = async (req, resp) => {
    const id = req.params.id;
    console.log(id)
    

    
    const [book] = await db.select().from(booksTable).where(table=>eq(table.id,id)).limit(1);
    console.log(book);
    if (!book) {
        return resp.status(404).json({ error: "Book Not Found !!" });
    }
    return resp.status(201).json(book);
}

exports.savebooks=async (req,resp)=>{
    const {title,authorId,description}=req.body;
    
       if(!title||title===""){
        return resp.status(400).json({error:"Title Required"});
       }
    
      
    
       const [result]=await db.insert(booksTable).values({
        title,
        authorId,
        description
       }).returning({
        id:booksTable.id
       })
    
       console.log(result);
        return resp.status(201).json({Message:"Book Saved...!!",id:result.id});
    
}

exports.deletebookbyid=async (req,resp)=>{
     const id =req.params.id;
        // console.log(id)
       
        await db.delete(booksTable).where(eq(booksTable.id,id));
        
        return resp.status(202).json({"Message":"Book Deleted...."});
}