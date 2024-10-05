import UploadSection from "./_components/upload_section";
import { getMyAIResponce } from "~/server/ai_api_calls";
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export default async function HomePage() {
  try {
    const aiResponse = await getMyAIResponce();
    // Handle successful response
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <UploadSection/>
        {aiResponse.name}
      </main>)
  } catch (error) {
    console.error("Failed to get AI response:", error);
    // Handle the error appropriately in your UI
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <UploadSection/>
        <p>Failed to get AI response</p>
      </main>)
  }
 
  
  
}
