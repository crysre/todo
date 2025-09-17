import axios from "./axios" //importing custom instance


async function handleSignup(data){
    const response = await axios.post("http://localhost:3000/signup", data)
    console.log(response);
    
}


async function handleLogin(data){
    const response = await axios.post("http://localhost:3000/login", data)
    console.log(response);
    localStorage.setItem("token",response.data.token);
}


export {handleSignup, handleLogin};
export default handleSignup;
