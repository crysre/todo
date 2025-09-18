import { useState } from "react";
import submitNote, { getNotes } from "../api/notes";





function Create({ notes, setNotes}){

    const [note, setNote] = useState({
        title:"",
        body:""
    });

    async function handleClick(){
        await submitNote(note);

        setNote({
        title:"",
        body:""
    })

      async function fetchNotes(){
            const response = await getNotes();
            setNotes(response.data.notes)

        }

        fetchNotes()
    

    
    }

    function handleChange(e){

        const {name, value} = e.target;

        setNote(x=>{
            return{
                ...x,
                [name]:value
            }
        })


        
        
        



        // console.log(e.target.name);
        
        // console.log(e.target.value);
        
    }



    return <div className=" mt-8 rounded-xl w-100 flex flex-col bg-gray-500">
            <form className=" p-5 flex flex-col gap-2" >
                <input value={note.title}  onChange={handleChange} name="title" className=" p-3 rounded-xl outline-none bg-gray-200 "  placeholder="title"/>
                <textarea value={note.body} onChange={handleChange} name="body" className=" p-3 resize-none rounded-xl outline-none bg-gray-200"  placeholder="body" rows="3"/>
                <button onClick={handleClick} type="button"  className=" self-baseline-last w-16 rounded bg-blue-800">Add</button>
            </form>
    </div>
}

export default Create;