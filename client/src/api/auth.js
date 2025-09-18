import axios from "./axios" //importing custom instance


async function handleSignup(data){
    try{
        const response = await axios.post("http://localhost:3000/signup", data)
        console.log(response);
    }catch(e){
        console.log("Signup failed ", e);
        
    }
    
    
}


async function handleLogin(data){
    try{
        
    const response = await axios.post("http://localhost:3000/login", data)
    console.log(response);
    localStorage.setItem("token",response.data.token);
    }catch(e){
        console.log("Login failed ", e);
        
    }
}


export {handleSignup, handleLogin};
export default handleSignup;
