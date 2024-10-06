import { getMyItems } from "~/server/queries";
import LecturePageWrap from "./lectureWrap";

interface Props {
  params: { id: string }; // Define the params prop
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LecturePage({ params }: Props) {
  console.log(decodeURIComponent(params.id));

  const docs = await getMyItems(decodeURIComponent(params.id).toString());
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <LecturePageWrap docs={docs} />
      
    </div>
  );
}