const express=require("express");
const controller = require("../controllers/author.controller");

const authorrouter=express.Router();



//all Routes...


authorrouter.get("/",controller.getallauthors)

//POST Route...
authorrouter.post("/",controller.createauthor)


authorrouter.get("/:id",controller.getbooksbyid);   //Get all books associated with this authors id


module.exports=authorrouter;