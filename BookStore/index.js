const express = require("express");
const fs=require("fs");
const app = express();
const PORT = 8000;


//Middlewear Plugins
app.use(express.json());

//First Middlewear
app.use((req,resp,next)=>{
    console.log("I am a middlewear...");
    // next();  //allow next methods(routes) or middlewears to run.

    // return resp.json({"message":"Middlewear Runned..."})  //this is early return

    const log=`\n [${Date.now()}] ${req.method} ${req.path} `;
    fs.appendFileSync("logs.txt",log,"utf-8");
    
    next();
})


//Memory DB
const books = [
    { id: 1, title: "Book one", Author: "BookOneAuthor" },
    { id: 2, title: "Book two", Author: "BookOneAuthor2" }
]

//Routes.....

app.get("/book",(req,resp)=>{
    resp.json(books);
})

//dynamic
app.get("/book/:id",(req,resp)=>{
    const id =parseInt(req.params.id);
    console.log(id)
    if(isNaN(id)){
     return resp.status(400).json({error:"Bad Request id must be a number !!"})
    }

    const book=books.find((e)=>e.id===id);
    console.log(book);
    if(!book){
        return resp.status(404).json({error:"Book Not Found !!"});
    }
    return resp.status(201).json(book);
});


//POST Route...
app.post("/book",(req,resp)=>{
   const {title,author}=req.body;

   if(!title||title===""){
    return resp.status(400).json({error:"Title Required"});
   }

   if(!author||author===""){
    return resp.status(400).json({error:"author Required"});
   }

   const id=books.length+1;
   books.push({id,title,author});

   console.log(books);
    return resp.status(201).json({Message:"Book Saved...!!",id});
})

//DELETE ROUTE
app.delete("/book/:id",(req,resp)=>{
     const id =parseInt(req.params.id);
    console.log(id)
    if(isNaN(id)){
     return resp.status(401).json({error:"Bad Request id must be a number !!"})
    }

    const bookIndex=books.findIndex((e)=>e.id===id);
    if(bookIndex<0){
         return resp.status(404).json({error:"id didnt exists !!"});
    }
    books.splice(bookIndex,1);
    console.log(books);
    
    return resp.status(202).json({"Message":"Book Deleted...."});

})






app.listen(PORT);