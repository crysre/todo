import { useState } from "react";
import { handleLogin } from "../api/auth";
import {useNavigate} from "react-router-dom";

function Login(){
    function reloadPage(){
        window.location.reload();
    }

     const navigate = useNavigate()

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

    async function handleClick(){

        try{
            
        await handleLogin(data)
        setData({
        email:"",
        password:""
    })

    navigate("/")
    reloadPage()
        }catch(e){
            console.log("Login failed ", e)
        }

    }


    return  <div className="mt-8 rounded-xl w-60 flex flex-col bg-gray-500" >
    <p className=" mt-5 self-center text-xl font-bold " >Login</p>
    <form className=" p-5 flex flex-col gap-2" >
        <input onChange={handleChange} value={data.email}  name="email" className=" p-3 rounded-xl outline-none bg-gray-200 " type="text" placeholder="Email" />
        <input onChange={handleChange} value={data.password} name="password" className=" p-3 rounded-xl outline-none bg-gray-200 " type="password" placeholder="Password" />
        <button onClick={handleClick} type="button" className=" p-1 rounded-xl bg-blue-900" >Submit</button>
    </form>
    </div>
}
export default Login;