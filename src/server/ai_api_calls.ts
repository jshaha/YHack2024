import "server-only";


export async function getMyAIResponce(){
    let data = (await fetch('http://localhost:5328/api/ai/python')).json()
    return data
}