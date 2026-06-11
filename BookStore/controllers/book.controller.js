const { BOOKS } = require("../models/book");

exports.getallbooks = (req, resp) => {
    resp.json(BOOKS);
}

exports.getallbooksbyid = (req, resp) => {
    const id = parseInt(req.params.id);
    console.log(id)
    if (isNaN(id)) {
        return resp.status(400).json({ error: "Bad Request id must be a number !!" })
    }

    const book = BOOKS.find((e) => e.id === id);
    console.log(book);
    if (!book) {
        return resp.status(404).json({ error: "Book Not Found !!" });
    }
    return resp.status(201).json(book);
}

exports.savebooks=(req,resp)=>{
    const {title,author}=req.body;
    
       if(!title||title===""){
        return resp.status(400).json({error:"Title Required"});
       }
    
       if(!author||author===""){
        return resp.status(400).json({error:"author Required"});
       }
    
       const id=BOOKS.length+1;
       books.push({id,title,author});
    
       console.log(BOOKS);
        return resp.status(201).json({Message:"Book Saved...!!",id});
    
}

exports.deletebookbyid=(req,resp)=>{
     const id =parseInt(req.params.id);
        console.log(id)
        if(isNaN(id)){
         return resp.status(401).json({error:"Bad Request id must be a number !!"})
        }
    
        const bookIndex=BOOKS.findIndex((e)=>e.id===id);
        if(bookIndex<0){
             return resp.status(404).json({error:"id didnt exists !!"});
        }
        BOOKS.splice(bookIndex,1);
        console.log(BOOKS);
        
        return resp.status(202).json({"Message":"Book Deleted...."});
}