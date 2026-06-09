const http=require("http");

//.... Practice Exercise.....//

const server=http.createServer((req,resp)=>{

    // console.log("Got Request !!");
    
    console.log(req.url)
    console.log(req.method)
    switch(req.url){
        case "/": return resp.writeHead(201).end("Hello Sir !! ");
        break;
        case "/contact-us":  return resp.writeHead(201).end("Contact At : abc@gmail.com , Pathak !! ");
        break;
        case "/tweet":
        if (req.method === "POST") {
            return resp.writeHead(202).end("Tweets Saved");
        }

        if (req.method === "GET") {
            return resp.writeHead(202).end("Tweets Are 1,2,3,4 .......");
        }
        break;
    }
  
    return resp.writeHead(404).end("You're Lost Broo")


});

server.listen(8000,()=>{
    console.log("Server Running on Port 8000")
})