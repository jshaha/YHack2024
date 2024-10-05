import "server-only";

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:5328/api";

export async function getMyAIResponce(){
    let data = (await fetch(`${URL}/ai/python`)).json()
    return data
}