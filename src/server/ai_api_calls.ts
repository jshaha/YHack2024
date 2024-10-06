

export async function getMyAIResponce() {
  const apiUrl = `https://dog.ceo/api/breeds/image/random`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

