import { useEffect } from "react";
import { editOrDeleteNotes, getNotes } from "../api/notes";
import { useState } from "react";
import editImage from "../assets/edit-svgrepo-com.svg";
import deleteImage from "../assets/delete-1487-svgrepo-com.svg"

function Notes(){

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        async function fetchNotes(){
            const response = await getNotes();
            setNotes(response.data.notes)

        }

        fetchNotes()

    }, [notes])

    console.log("I'm notes", notes);
    


    return <div className="ml-5" >
         {notes.map((note)=>{
            return <Note id={note._id} key={note._id} title={note.title} body={note.body} />
         })}
    </div>
}

function Note({title, body, id}){
    
    async function handleClick(e){

        console.log("I've been clicked",e.target.name, id)
        const name = e.target.name;
        const response = await editOrDeleteNotes(name, id)

        response.status=202?setNotes((prevNotes)=>{
            prevNotes.filter((note)=>note.id !==id )
        }):null

        console.log("I'm response", response.status);
        
    }

    return <div className=" px-2 shadow-2xl float-left mx-5 my-5 rounded-xl p-2 w-60 bg-gray-200" >
        <h1 className="text-black" >{title}</h1>
        <p className="text-black" >{body}</p>
        <img onClick={handleClick} name="delete" className=" float-right h-5" src={deleteImage} alt="" />

    </div>
}

export default Notes;