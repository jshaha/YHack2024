"server-only"
import { db } from "./db";

export async function getMyLectures() {
 
  const docs = await db.query.slides.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => [desc(model.id)],
  });
  return docs;
}
  ;
  
export async function getMyItems(url:string) {

  const docs = await db.query.items.findMany({
    where: (model, { eq }) => eq(model.pdf_url, url ?? ''),
    orderBy: (model, { desc }) => [desc(model.page)],
  });
  return docs;
}