import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    const experience = await prisma.experience.update({
      where: { id: params.id },
      data: {
        role: b.role,
        company: b.company,
        period: b.period,
        description: b.description,
        tech: b.tech ?? [],
        order: b.order ?? 0,
      },
    });
    return NextResponse.json(experience);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    await prisma.experience.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
