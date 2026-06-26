import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    const stat = await prisma.stat.create({
      data: {
        label: b.label,
        value: b.value,
        suffix: b.suffix ?? '+',
        order: b.order ?? 0,
      },
    });
    return NextResponse.json(stat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const b = await req.json();
    const stat = await prisma.stat.update({
      where: { id: b.id },
      data: {
        label: b.label,
        value: b.value,
        suffix: b.suffix ?? '+',
        order: b.order ?? 0,
      },
    });
    return NextResponse.json(stat);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  try {
    const { id } = await req.json();
    await prisma.stat.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
