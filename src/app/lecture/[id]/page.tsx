import { getMyItems } from "~/server/queries";
import LecturePageWrap from "./lectureWrap";

interface Props {
  params: { url: string }; // Define the params prop
}

export default async function LecturePage({ params }: Props) {
  const { id } = params as { id: string };
  console.log(decodeURIComponent(id));

  const docs = await getMyItems(decodeURIComponent(id).toString());
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <LecturePageWrap docs={docs} />
      
    </div>
  );
}