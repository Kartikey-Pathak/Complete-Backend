const express=require("express");
const controller = require("../controllers/book.controller");

const bookrouter=express.Router();



//all Routes...

bookrouter.get("/",controller.getallbooks)

//dynamic
bookrouter.get("/:id",controller.getallbooksbyid);


//POST Route...
bookrouter.post("/",controller.savebooks)

//DELETE ROUTE
bookrouter.delete("/:id",controller.deletebookbyid)

module.exports=bookrouter;