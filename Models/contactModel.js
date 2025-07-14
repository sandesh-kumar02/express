import mongoose from "mongoose";

//creating schema 

let userSchema = mongoose.Schema({
    name: {
        type : String,
        default : 'sandesh kumar',
        required : true
    },
    gender : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
    }
});

// creating a model

let User = mongoose.model('User', userSchema);

export default User;