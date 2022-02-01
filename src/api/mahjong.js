import axios from 'axios'

export function saveScore(time, token){
    axios.post("http://localhost:1999/mahjong/savescore", {time, token}).then((response)=>{
        console.log(response.data)
    }).catch((error)=>{
        console.log(error)
    })
}

export async function getPersonalScores(token){
    let result
    await axios.post("http://localhost:1999/mahjong/personalscores", {token}).then((response)=>{
        result = response.data
    }).catch((error)=>{
        console.log(error)
    })
    return result
}

export async function getAllScores(){
    let result
    await axios.get("http://localhost:1999/mahjong/allscores").then((response)=>{
        result = response.data
    }).catch((error)=>{
        console.log(error)
    })
    return result
}