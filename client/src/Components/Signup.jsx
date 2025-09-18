import { useState } from "react";
import handleSignup from "../api/auth";
import { useNavigate } from "react-router-dom";

function Signup(){

    const navigate = useNavigate()

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
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
        await handleSignup(data)
        
        navigate("/login")
        
    }



    return <div className="mt-8 rounded-xl w-60 flex flex-col bg-gray-500" >
        <p className=" mt-5 self-center text-xl font-bold " >Signup</p>
    <form className=" p-5 flex flex-col gap-2" >
        <input onChange={handleChange} name="firstName" className=" p-3 rounded-xl outline-none bg-gray-200 " type="text" placeholder="First Name" />
        <input onChange={handleChange} name="lastName"  className=" p-3 rounded-xl outline-none bg-gray-200 " type="text" placeholder="Last Name"/>
        <input onChange={handleChange} name="email" className=" p-3 rounded-xl outline-none bg-gray-200 " type="text" placeholder="Email" />
        <input onChange={handleChange} name="password" className=" p-3 rounded-xl outline-none bg-gray-200 " type="password" placeholder="Password" />
        <button onClick={handleClick} type="button" className=" p-1 rounded-xl bg-blue-900" >Submit</button>
    </form>
    </div>
}
export default Signup;