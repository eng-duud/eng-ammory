import { NextResponse } from "next/server";
import { getProjects } from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured") === "true";
    const rows = await getProjects(featured ? { featured: true } : { hidden: false });
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
