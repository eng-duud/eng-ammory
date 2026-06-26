import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const projects = await prisma.project.findMany({
      include: {
        category: true,
        tech: true,
        images: true,
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

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    
    const slugBase = b.slug || b.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const project = await prisma.project.create({
      data: {
        title: b.title,
        titleEn: b.titleEn || null,
        slug: slug,
        description: b.description,
        descriptionLong: b.descriptionLong || null,
        categoryId: b.categoryId,
        liveUrl: b.liveUrl || null,
        githubUrl: b.githubUrl || null,
        featured: b.featured ?? false,
        hidden: b.hidden ?? false,
        order: b.order ?? 0,
        color: b.color || '#1a3a5c',
        accent: b.accent || '#4a9eff',
        year: b.year || null,
        coverImage: b.coverImage || null,
        tech: {
          create: b.tech?.map((t: string) => ({ name: t })) || [],
        },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
