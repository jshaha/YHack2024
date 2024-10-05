import UploadSection from "./_components/upload_section";
import { getMyAIResponce } from "~/server/ai_api_calls";
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export default async function HomePage() {
  const data = await getMyAIResponce()
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <UploadSection/>
      {data?.name}
    </main>
  );
}
