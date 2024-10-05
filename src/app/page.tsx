import UploadSection from "./_components/upload_section";
import { getMyAIResponce } from "~/server/ai_api_calls";
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export default async function HomePage() {
  const data = await getMyAIResponce()
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/ai`
  : "http://localhost:5328/api/ai";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Hello World!</h1>
      <UploadSection/>
      <p>{URL}</p>
    </main>
  );
}
