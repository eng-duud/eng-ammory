import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
export async function GET() {
  try { return NextResponse.json(await sql`SELECT * FROM stats ORDER BY "order"`); }
  catch { return NextResponse.json([]); }
}
