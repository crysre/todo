import axios from "./axios";

async function submitNote(note){
    const response = await axios.post("/notes", note )
    console.log(response);
    
}

async function getNotes(){
    const response = await axios.get("/notes")
    return response
}

async function editOrDeleteNotes(name, id, editedNote){
    if (name=="edit"){
        const response = await axios.patch(`/notes/${id}`, editedNote);
        return response
        
    }else if(name=="delete"){
        const response = await axios.delete(`/notes/${id}`)
        return response
    }
}

export default submitNote;
export {getNotes, editOrDeleteNotes};