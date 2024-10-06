import UploadSection from "./_components/upload_section";
import { getMyLectures } from "~/server/queries";
import HowItWorks from "./_components/how_it_works";
import Hero from "./_components/hero";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function urlToFolderName(url: string, maxLength: number = 255): string {
  // Step 1: Replace invalid characters with underscores
  const folderName = url.replace(/[<>:"/\\|?*]/g, '_');
  
  // Step 2: Limit the length of the folder name
  if (folderName.length > maxLength) {
    // If the folder name is too long, use a hash of the URL to ensure uniqueness
    const hashObject = crypto.createHash('md5').update(url).digest('hex');
    return folderName.slice(0, maxLength - hashObject.length - 1) + '_' + hashObject;
  }
  
  return folderName;
}

async function UploadFlow() {
  const myLectures = await getMyLectures();

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
              <div className="bg-white rounded-lg shadow-md p-4 text-gray-800 flex flex-col ">
                <div className="mb-2">
                  <div className="w-full h-32 bg-gray-200 mb-4 rounded-sm">
                    <img 
                      src={`http://localhost:9000/images/${urlToFolderName(pdf.url)}/page_1.png`} 
                      alt={`loading`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{pdf.name}</h3>
                  <p className="text-sm text-gray-600">Uploaded on: {new Date(pdf.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
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
  );
}
