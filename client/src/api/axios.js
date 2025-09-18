import axios from "axios";

const port = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token")

function isToken(){
    if(token){
        return true
    }else{
        return false
    }
}

function logOut(){
    localStorage.setItem("token", "")
}


const instance = axios.create({
    baseURL:`${port}`
})

if(token){
    instance.defaults.headers.common["token"] = token;
}

console.log(instance);

export default instance;
export {isToken, logOut};