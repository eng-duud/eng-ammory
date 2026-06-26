import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    const experience = await prisma.experience.create({
      data: {
        role: b.role,
        company: b.company,
        period: b.period,
        description: b.description,
        tech: b.tech ?? [],
        order: b.order ?? 0,
      },
    });
    return NextResponse.json(experience, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
