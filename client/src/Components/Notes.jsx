import { useEffect } from "react";
import { editOrDeleteNotes, getNotes } from "../api/notes";
import { useState } from "react";
import DeleteIcon from "../assets/deleteIcon";
import EditIcon from "../assets/editIcon";
// import {ReactComponent as editImage} from "../assets/edit-svgrepo-com.svg";


function Notes(){

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        async function fetchNotes(){
            const response = await getNotes();
            setNotes(response.data.notes)

        }

        fetchNotes()

    }, [])

    console.log("I'm notes", notes);
    


    return <div className="ml-5" >
         {notes.map((note)=>{
            return <Note setNotes={setNotes} id={note._id} key={note._id} title={note.title} body={note.body} />
         })}
    </div>
}

function Note({title, body, id, setNotes}){

    const [isEditing, setEditing] = useState(false);
    const [editedNote, setEditedNote] = useState({
        title:title,
        body:body
    })

    function handleEdit(){

        console.log(title, body);
        

            setEditing((x)=>!x)
            
    }

    function editChange(e){

        const {name, value} = e.target;

        setEditedNote((prevNote)=>{
            return{
                ...prevNote,
                [name]:value

            }

        })
    }
    
    async function handleClick(e){

        console.log("I've been clicked",e.target.name, id)
        const name = e.target.name;
        
        const response = await editOrDeleteNotes(name, id)

        if(response.status === 202)setNotes((prevNotes)=>{
            return prevNotes.filter((note)=> note._id !==id )
        })

        console.log("I'm response", response.status);
        
    }

    return <div className=" px-2 shadow-2xl float-left mx-5 my-5 rounded-xl p-2 w-60 bg-gray-200" >
        {isEditing?
        <>
        <input name="title" onChange={editChange} value={editedNote.title} className="text-black" /><input onChange={editChange} name="body" value={editedNote.body} className="text-black"/>
        </>
        :<>
        <h1 className="text-black" >{title}</h1><p className="text-black" >{body}</p>
        </>}
        

        {/* {isEditing?<Cancel></Cancel>:<DeleteIcon onClick={handleClick} name="delete" className=" hover:text-red-600 float-right h-5"/>} */}

        {/* {isEditing?<Send></Send>:<EditIcon onClick={handleEdit} name="edit" className=" hover:text-blue-800 float-right h-5"  />} */}


    </div>
}

export default Notes;