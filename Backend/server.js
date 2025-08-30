import express from "express";
import dotenv from "dotenv"
import NoteModel from "./models/note.js"
import mongoose from "mongoose";

dotenv.config();


const app = express();
const port = process.env.port;
app.use(express.json())

app.get("/notes/", async(req, res)=>{

    const notes = await NoteModel.find({})

    res.json({
        notes
    })
    
    

})


app.post("/notes", async(req, res)=>{
    
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

})

app.patch("/notes/:id", async(req, res)=>{
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


})

app.delete("/notes/:id", async(req, res)=>{
    
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
    

})



async function main(){

    await mongoose.connect(process.env.MONGO_URL)

    app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
    
})
}

main()