import mongoose from "mongoose"

const {Schema} = mongoose;


const Note = new Schema({

    title: String,
    body: String,
    user: {type:Schema.Types.ObjectId, ref:"User"}

    
})

const NoteModel = mongoose.model("Notes", Note);

module.exports= NoteModel;