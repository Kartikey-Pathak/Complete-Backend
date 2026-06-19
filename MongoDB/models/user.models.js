import { model, Schema } from "mongoose";

const userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt:{
         type: String,
    }
},{timestamps:true});

const User=model('user',userschema);
export default User;
