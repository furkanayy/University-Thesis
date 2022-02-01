import axios from 'axios'

export function signup(name, surname, email, username, password){
    axios.post("http://localhost:1999/user/signup", {name,surname,email,username, password}).then((response)=>{
        alert(response.data)
    }).catch((error)=>{
        console.log(error)
    })
}