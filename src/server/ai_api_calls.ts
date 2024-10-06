"server-only"

const apiUrl = `https://yhack2024-ai-production.up.railway.app/`;

export async function getMyAIResponce() {

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

