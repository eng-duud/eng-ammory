import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured") === "true";
    
    const projects = await prisma.project.findMany({
      where: {
        ...(featured ? { featured: true } : { hidden: false }),
      },
      include: {
        category: true,
        tech: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
