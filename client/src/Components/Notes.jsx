import { useEffect } from "react";
import { getNotes } from "../api/notes";
import { useState } from "react";

function Notes(){

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        async function fetchNotes(){
            const response = await getNotes();
            setNotes(response.data.notes)

        }

        fetchNotes()

    }, [])

    console.log(notes);
    


    return <div className="ml-5" >
         {notes.map((note, index)=>{
            return <Note key={index} title={note.title} body={note.body} />
         })}
    </div>
}

function Note({title, body}){
    return <div className=" shadow-2xl float-left mx-5 my-5 rounded-xl p-2 w-60 bg-gray-200" >
        <h1 className="text-black" >{title}</h1>
        <p className="text-black" >{body}</p>
    </div>
}

export default Notes;