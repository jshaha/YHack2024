import UploadSection from "./_components/upload_section"
import { getMyAIResponce } from "~/server/ai_api_calls"
import { getMyLectures } from "~/server/queries"
import HowItWorks from "./_components/how_it_works"
import Hero from "./_components/hero"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function UploadFlow() {
  const myLectures = await getMyLectures()
  
  return (
    <div className="flex flex-col md:flex-row w-full p-4 gap-4">
        <div className="w-full md:w-1/3">
          <UploadSection />
        </div>
        <div className="w-full md:w-2/3 ">
          <h2 className="text-2xl font-bold mb-4">Previously Uploaded PDFs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-9">
        {myLectures.map((pdf) => (
        <Link href={{ pathname: `/lecture/` + encodeURIComponent(pdf.url) }} key={pdf.id}>
          {/* <Link href={`/lecture/${pdf.id}`} key={pdf.id}></Link> */}
        <div className="bg-white rounded-lg shadow-md p-4 text-gray-800 flex flex-col ">
          <div className="mb-2">
                      <div className="w-full h-32 bg-gray-200 mb-4 rounded-sm">
                        <img src={`http://localhost:9000/images/${pdf.url}/page_1.png`} alt={`Preview of ${pdf.url}`} className="w-full h-full object-cover" />
                      </div>
            <h3 className="font-semibold text-lg">{pdf.name}</h3>
            <p className="text-sm text-gray-600">Uploaded on: {pdf.createdAt.toLocaleString()}</p>
          </div>
          
        </div></Link>
      ))}
    </div>
        </div>
      </div>
  )
}export default async function HomePage() {
  
  return (
    <main className="flex min-h-screen flex-col">
      <SignedOut>
        <Hero />
        <HowItWorks />
      </SignedOut>
      <SignedIn>
        <div className="flex justify-end p-9">
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-12 h-12" } }} />
        </div>
        <UploadFlow />
      </SignedIn>
    </main>
  )
}