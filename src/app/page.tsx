import UploadSection from "./_components/upload_section"
import { getMyAIResponce } from "~/server/ai_api_calls"
import { getMyLectures } from "~/server/queries"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  
  const myLectures = await getMyLectures()
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col md:flex-row w-full p-4 gap-4">
        <div className="w-full md:w-1/3">
          <UploadSection />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Previously Uploaded PDFs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myLectures.map((pdf) => (
        <div key={pdf.id} className="bg-white rounded-lg shadow-md p-4 text-gray-800">
          <h3 className="font-semibold text-lg mb-2">{pdf.name}</h3>
          <p className="text-sm text-gray-600">Uploaded on: {pdf.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
        </div>
      </div>
    </main>
  )
}