import UploadSection from "./_components/upload_section";

export default async function HomePage() {
  let data = await fetch('http://localhost:5328/api/ai/python')
  let posts = await data.json()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Hello World!</h1>
      <UploadSection/>
      {posts}
    </main>
  );
}
