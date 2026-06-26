import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        category: true,
        tech: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error: any) {
    console.error("API Error [Project Detail]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message }, 
      { status: 500 }
    );
  }
}
