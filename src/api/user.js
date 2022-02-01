import axios from 'axios'

export async function getProfileInfo(token){
    let user
    
    await axios.post("http://localhost:1999/user/getprofileinfo", {token}).then((response)=>{
        user = response.data
    }).catch((error)=>{
        console.log(error)
    })

    return user
}

export function editProfile(token,name,surname,email,username,password){
    axios.post("http://localhost:1999/user/editprofile", {token,name,surname,email,username,password}).then((response)=>{
        if(response.data[1] === 1){
            localStorage.setItem("username", username)
        }
        alert(response.data[0])
    }).catch((error)=>{
        console.log(error)
    })
}