import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    
    // Use a transaction to update project and its related tech
    const project = await prisma.$transaction(async (tx) => {
      // Update basic project info
      const updatedProject = await tx.project.update({
        where: { id: params.id },
        data: {
          title: b.title,
          titleEn: b.titleEn || null,
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
        },
      });

      // Update tech if provided
      if (b.tech) {
        // Delete existing tech
        await tx.projectTech.deleteMany({
          where: { projectId: params.id },
        });
        // Create new tech entries
        if (b.tech.length > 0) {
          await tx.projectTech.createMany({
            data: b.tech.map((t: string) => ({
              projectId: params.id,
              name: t,
            })),
          });
        }
      }

      return updatedProject;
    });

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
