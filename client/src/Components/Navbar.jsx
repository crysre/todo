import {Link, useLocation} from "react-router-dom"
import { isToken, logOut } from "../api/axios";

function Navbar(){
    const location = useLocation();
    const isLoggedin = isToken();
    function reloadPage(){
        window.location.reload();
    }

    function callLogOut(){
        logOut()
        reloadPage()

    }


    return <div className=" rounded h-16 w-screen px-5 flex items-center text-white justify-between sticky top-0 bg-black">
        <Link to="/" className=" text-2xl" >Notes</Link>
        {isLoggedin?(
         <Link to="/" onClick={callLogOut} className="text-xl" >Logout</Link> )
          :location.pathname === "/login" ?(
           <Link to="/signup" className="text-xl" >Signup</Link>)
            :(<Link to="/login" className="text-xl" >Login</Link>
            )}
    </div>
}

export default Navbar