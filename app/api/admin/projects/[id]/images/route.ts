import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const { url, alt, order } = await req.json();
    const image = await prisma.projectImage.create({
      data: {
        projectId: params.id,
        url,
        alt: alt || null,
        order: order ?? 0,
      },
    });
    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const { imageId } = await req.json();
    await prisma.projectImage.delete({
      where: { 
        id: imageId,
        projectId: params.id
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
