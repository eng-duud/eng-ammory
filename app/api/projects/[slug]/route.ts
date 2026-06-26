import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        tech: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });
    
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
