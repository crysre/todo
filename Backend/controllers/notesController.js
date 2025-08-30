import mongoose from "mongoose";
import NoteModel from "../models/note.js";


export const showAllNotes= async (req, res)=>{

    const notes = await NoteModel.find({})

    res.json({
        notes
    })
    
    

}

export const createNote =  async (req, res)=>{
    
    const title = req.body.title;
    const body = req.body.body;
    const isDone = req.body.isDone;

    
    

    try{
        await NoteModel.create({
        title: title,
        body:body,
        isDone: isDone
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

    console.log(id);

    try{
        await NoteModel.deleteOne({
        _id:noteId
    })

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

    
    const id = req.params.id
    const noteId = new mongoose.Types.ObjectId(id)

    try{
        await NoteModel.findByIdAndUpdate({
        _id:noteId
    },
    {$set:{title,body,isDone}}
)

res.status(200).json({
    message:"note updated"
})
    }catch(e){
        res.status(404).json({
            message:"Message didn't get updated"
        })
    }


}




