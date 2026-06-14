const express=require("express");
const controller = require("../controllers/author.controller");

const authorrouter=express.Router();



//all Routes...


authorrouter.get("/",controller.getallauthors)

//POST Route...
authorrouter.post("/",controller.createauthor)

module.exports=authorrouter;