const EventEmitter=require("events");
const eventemitter=new EventEmitter();  //instance

eventemitter.on("hello",(name)=>{
    console.log(`Hello World From Emit hello...${name}`);
})

eventemitter.once("any",()=>{
    console.log("Runs Once only")
})

eventemitter.emit("hello","Kartik");  //emit Event
eventemitter.emit("any");
eventemitter.emit("any");  //runs only once but