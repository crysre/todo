import { useState } from "react";
import { handleLogin } from "../api/auth";

function Login(){

    const [data, setData] = useState({
        email:"",
        password:""
    })

    function handleChange(e){
        const {name, value} = e.target;

        setData(x=>{
            return{
                ...x,
                [name]:value
            }
        })
        
        
        
    }

    function handleClick(){
        handleLogin(data)
    }


    return  <div className="mt-8 rounded-xl w-60 flex flex-col bg-gray-500" >
    <p className=" mt-5 self-center text-xl font-bold " >Login</p>
    <form className=" p-5 flex flex-col gap-2" >
        <input onChange={handleChange} name="email" className=" p-3 rounded-xl outline-none bg-gray-200 " type="text" placeholder="Email" />
        <input onChange={handleChange} name="password" className=" p-3 rounded-xl outline-none bg-gray-200 " type="password" placeholder="Password" />
        <button onClick={handleClick} type="button" className=" p-1 rounded-xl bg-blue-900" >Submit</button>
    </form>
    </div>
}
export default Login;