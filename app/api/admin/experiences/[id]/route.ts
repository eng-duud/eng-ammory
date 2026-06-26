import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  const [e] = await sql`UPDATE experiences SET role=${b.role},company=${b.company},period=${b.period},description=${b.description},tech=${b.tech??[]},"order"=${b.order??0} WHERE id=${params.id} RETURNING *`;
  return NextResponse.json(e);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  await sql`DELETE FROM experiences WHERE id=${params.id}`;
  return NextResponse.json({ ok: true });
}
