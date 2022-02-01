import axios from 'axios'

export function signin(username, password){
    axios.post("http://localhost:1999/user/signin", {username, password}).then((response)=>{
        localStorage.setItem("token", response.data[0])
        localStorage.setItem("username", response.data[1])
    }).catch((error)=>{
        console.log(error)
    })
}