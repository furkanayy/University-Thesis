import axios from 'axios'

export function saveScore(time, moves, token){
    axios.post("http://localhost:1999/maze/savescore", {time, moves, token}).then((response)=>{
        console.log(response.data)
    }).catch((error)=>{
        console.log(error)
    })
}

export async function getPersonalScores(token){
    let result
    await axios.post("http://localhost:1999/maze/personalscores", {token}).then((response)=>{
        result = response.data
    }).catch((error)=>{
        console.log(error)
    })
    return result
}

export async function getAllScores(){
    let result
    await axios.get("http://localhost:1999/maze/allscores").then((response)=>{
        result = response.data
    }).catch((error)=>{
        console.log(error)
    })
    return result
}