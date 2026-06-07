console.log("Hello World From - > Index.js");

const fs=require("node:fs");

let txt=fs.readFileSync("any.txt","ascii");
// fs.writeFileSync("copy.txt"," World!!","utf-8");  //It Overwrites content
// fs.appendFileSync("copy.txt","\n Says Hello","utf-8");  //it appends the data

console.log(txt)