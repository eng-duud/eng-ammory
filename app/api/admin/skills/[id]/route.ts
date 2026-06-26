import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  const [s] = await sql`UPDATE skills SET name=${b.name},level=${b.level},"order"=${b.order??0},group_id=${b.groupId} WHERE id=${params.id} RETURNING *`;
  return NextResponse.json(s);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  await sql`DELETE FROM skills WHERE id=${params.id}`;
  return NextResponse.json({ ok: true });
}
