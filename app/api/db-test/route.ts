import { db } from "@/db";
import { testTable } from "@/db/schema";

export async function GET() {
  const result = await db.select().from(testTable);

  return Response.json(result);
}