import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/app/lib/db";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const project = await getProjectBySlug(params.slug);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
