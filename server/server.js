import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userAuth } from "./middleware/auth.js";
import cors from "cors";

import {handleSignup, handleLogin} from "./controllers/userController.js"

import {createNote,updateNote,deleteNote, showAllNotes} from "./controllers/notesController.js"


dotenv.config();

const app = express();
const port = process.env.port;
app.use(express.json())
app.use(cors());








app.post("/signup", handleSignup)

app.post("/login", handleLogin)




app.get("/notes/",userAuth, showAllNotes) 


app.post("/notes", createNote) 

app.patch("/notes/:id",userAuth, updateNote) 

app.delete("/notes/:id",userAuth, deleteNote) 



async function main(){

    await mongoose.connect(process.env.MONGO_URL)

    app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
    
})
}

main()