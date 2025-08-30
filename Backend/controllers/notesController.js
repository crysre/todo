import mongoose from "mongoose";
import NoteModel from "../models/note.js";


export const showAllNotes= async (req, res)=>{

    const userId = req.userId

    const notes = await NoteModel.find({user:userId})

    res.json({
        notes
    })
    
    

}

export const createNote =  async (req, res)=>{
    
    const title = req.body.title;
    const body = req.body.body;
    const isDone = req.body.isDone;
    const user = req.userId

    
    

    try{
        await NoteModel.create({
        title: title,
        body:body,
        isDone: isDone,
        user
    })

    res.status(200).json({
        message: "Entry made"
    })
    }catch(e){
        console.log(e);

        res.json({
            message:"Error"
        })
        
    }

}


export const deleteNote =  async (req, res)=>{
    
    const id = req.params.id
    const noteId = new mongoose.Types.ObjectId(id)
    const userId = req.userId

    console.log(id);

    try{
        const result = await NoteModel.deleteOne({ // this doesnt throw an error just returns deletecount
        _id:noteId,
        user:userId
    })

    if (result.deletedCount ===0){
        return res.status(404).json({
            message:"Note not found"
        })
    }

    res.status(202).json({
        message:"Note deleted"
    })

    }catch(e){
        res.status(404)
    }
    

}

export const updateNote =  async (req, res)=>{
    const title = req.body.title;
    const body = req.body.body;
    const isDone = req.body.isDone;
    const userId = req.userId

    
    const id = req.params.id
    const noteId = new mongoose.Types.ObjectId(id)

    try{
        const result = await NoteModel.findOneAndUpdate({
        _id:noteId,
        user:userId
    },
    {$set:{title,body,isDone}}
)

if(result == null){
    return res.status(404).json({
        message:"Note not found"
    })
}
console.log(result);


res.status(200).json({
    message:"note updated"
})
    }catch(e){
        res.status(404).json({
            message:"Message didn't get updated"
        })
    }


}




