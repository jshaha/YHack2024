import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyLectures() {
  const user = auth();

  const docs = await db.query.slides.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => [desc(model.id)],
  });
  return docs;
}