import mongoose from "mongoose";

async function ConnectDB(url){
    const connection= await mongoose.connect(url);
    return connection;
}

export default ConnectDB;