import { useState } from "react"
import Create from "./Components/CreateNote"
import Navbar from "./Components/Navbar"
import Notes from "./Components/Notes"
import Signup from "./Components/Signup"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"



function App() {
const [notes, setNotes] = useState([]);



  return <div className="flex flex-col items-center" >
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/Signup" element={<Signup/>} />
    <Route path="/" element={
    <>
    <Create notes={notes} setNotes={setNotes} />
    <Notes  notes={notes} setNotes={setNotes} />
    </>
    } />
  </Routes>
  </BrowserRouter>
  </div>
}

export default App
