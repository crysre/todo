import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userAuth } from "./middleware/auth.js";
import cors from "cors";

import {handleSignup, handleLogin} from "./controllers/userController.js"

import {createNote,updateNote,deleteNote, showAllNotes} from "./controllers/notesController.js"


dotenv.config();

const app = express();
app.use(cors({
    origin:"https://todofrontend-rose.vercel.app/",
    methods:["GET", "POST","PATCH", "PUT", "DELETE"],
    credentials: true
}));
const port = process.env.PORT || 3000;

app.use(express.json())


// app.use(cors());








app.post("/signup", handleSignup)

app.post("/login", handleLogin)




app.get("/notes/",userAuth, showAllNotes) 


app.post("/notes",userAuth, createNote) 

app.patch("/notes/:id",userAuth, updateNote) 
,
app.delete("/notes/:id",userAuth, deleteNote) 



async function main(){

    await mongoose.connect(process.env.MONGO_URL)

    app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
    
})
}

main()