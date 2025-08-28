import mongoose from "mongoose"

const Schema = mongoose.Schema;


const User = newSchema({
    email:{type:String, unique:true, lowercase: true, required:true},
    firstName: String,
    lastName: String,
    password: {type: String, required: true},
    notes: {type: mongoose.Schema.Types.ObjectId, ref:"Note"}
})

const UserModel = mongoose.model("users", User);

module.exports= UserModel;