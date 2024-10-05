// import "server-only";

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:5328/api";

export async function getMyAIResponce(){
    try {
        const response = await fetch(`${URL}/python`, {
          method: "GET",
        });
        
        return response
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    
}

