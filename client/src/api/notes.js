import axios from "./axios";

async function submitNote(note){
    const response = await axios.post("/notes", note )
    console.log(response);
    
}

async function getNotes(){
    try{
        
    const response = await axios.get("/notes")
    return response
    }catch(e){
        console.log("Fetching notes failed ", e)
    }
}

async function editOrDeleteNotes(name, id, editedNote){
    if (name==="edit"){

        try{
            
        const response = await axios.patch(`/notes/${id}`, editedNote);
        return response
        }catch(e){
            console.log("Patching notes failed ", e)
        }
        
    }else if(name==="delete"){
        try{
        const response = await axios.delete(`/notes/${id}`)
        return response
        }catch(e){
            console.log("Deleting notes failed ", e)
        }
    }
}

export default submitNote;
export {getNotes, editOrDeleteNotes};