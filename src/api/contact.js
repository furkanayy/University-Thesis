import axios from 'axios'

export function sendMessage(name, surname, email, message){
    axios.post("http://localhost:1999/contact/sendmessage", {name, surname, email, message}).then((response)=>{
        alert(response.data)
    }).catch((error)=>{
        console.log(error)
    })
}