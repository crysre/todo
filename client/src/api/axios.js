import axios from "axios";

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
    baseURL:"http://localhost:3000"
})

if(token){
    instance.defaults.headers.common["token"] = token;
}

console.log(instance);

export default instance;
export {isToken, logOut};