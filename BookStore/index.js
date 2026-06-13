require("dotenv/config");
const express = require("express");
const router = require("./routes/book.route");
const { loggermiddleware } = require("./Middlewares/logger");
const app = express();
const PORT = 8000;


//Middlewear Plugins
app.use(express.json());
//First Middlewear [Golbal Middlewear...]
app.use(loggermiddleware);


// //The Route Level Middlewear...
// function custommiddlewear(req,resp,next){
//     console.log("Custom Middlewear Route Level");
//     next();
// }


//Routes.....
app.use('/book',router);

app.listen(PORT);