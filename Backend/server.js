import express from "express";
import dotenv from "dotenv";
import NoteModel from "./models/note.js";
import UserModel from "./models/user.js";
import mongoose from "mongoose";
import {z} from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


dotenv.config();

const app = express();
const port = process.env.port;
app.use(express.json())
const jwt_secret = process.env.JWT_SECRET







app.post("/signup", async(req, res)=>{

    const requiredBody = z.object({
        email: z.email().min(3).max(50),
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(2).max(50),
        password: z.string().min(6).max(50)

    })

    const parsedData = requiredBody.safeParse(req.body)

    if(!parsedData.success){
        res.status(404).json({
            message:"Invalid credentials"
        })
    }

    const {email, password, firstName, lastName} = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, 5)

    try{
        await UserModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    })

    res.status(200).json({
        message:"Signed up"
    })
    }catch(e){
        res.status(404).json({
            message:"Error while signing up"
        })
    }

})

app.post("/login", async(req, res)=>{

        const requiredBody = z.object({
        email: z.email().min(3).max(50),
        password: z.string().min(6).max(50)

    })

    const parsedData = requiredBody.safeParse(req.body)

    if(!parsedData.success){
        res.status(404).json({
            message:"Invalid credentials"
        })
    }

    const {email, password} = parsedData.data;



    try{
        const user = await UserModel.findOne({
        email
    })

    let passwordCheck = await bcrypt.compare(password, user.password)
    


    if(passwordCheck){
        const token = jwt.sign({id:email}, jwt_secret)

        res.json({
            token
        })

        console.log(token);
        
    }else{
        res.json({
            message:"Wrong password"
        })
    }
    }catch(e){
        res.status(404).json({
            message:"User doesn't exist"
        })
    }

    

})




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