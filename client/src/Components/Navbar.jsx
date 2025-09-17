import {Link} from "react-router-dom"

function Navbar(){
    return <div className=" rounded h-16 w-screen px-5 flex items-center text-white justify-between sticky top-0 bg-black">
        <Link to="/" className=" text-2xl" >Notes</Link>
        <Link to="/login" className="text-xl" >Login</Link>
    </div>
}

export default Navbar