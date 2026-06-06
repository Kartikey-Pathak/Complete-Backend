console.log("Hello World From - > Index.js");
const fs=require("fs");
let txt=fs.readFileSync("any.txt","ascii");

console.log(txt)