import Create from "./Components/Create"
import Login from "./Components/login"
import Navbar from "./Components/Navbar"
import Notes from "./Components/Notes"
import Signup from "./Components/Signup"
import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"



function App() {

  

  



  return <div className="flex flex-col items-center" >
  <Navbar/>
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/Signup" element={<Signup/>} />
    <Route path="/Create" element={<Create/>} />
    <Route path="/" element={<Notes/>} />
  </Routes>
  </BrowserRouter>
  </div>
}

export default App
