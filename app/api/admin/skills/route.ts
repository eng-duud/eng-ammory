import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const groups = await prisma.skillGroup.findMany({
      orderBy: { order: 'asc' },
    });
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ groups, skills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    if (b.type === "group") {
      const slug = b.slug || b.name.toLowerCase().replace(/\s+/g, "-");
      const group = await prisma.skillGroup.create({
        data: {
          name: b.name,
          slug: slug,
          order: b.order ?? 0,
        },
      });
      return NextResponse.json(group, { status: 201 });
    }
    const skill = await prisma.skill.create({
      data: {
        name: b.name,
        level: b.level ?? 80,
        order: b.order ?? 0,
        groupId: b.groupId,
      },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
