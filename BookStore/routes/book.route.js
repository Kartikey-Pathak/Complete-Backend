const express=require("express");
const { BOOKS } = require("../models/book");
const controller = require("../controllers/book.controller");

const router=express.Router();



//all Routes...

router.get("/",controller.getallbooks)

//dynamic
router.get("/:id",controller.getallbooksbyid);


//POST Route...
router.post("/",controller.savebooks)

//DELETE ROUTE
router.delete("/:id",controller.deletebookbyid)

module.exports=router;