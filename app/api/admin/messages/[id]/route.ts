import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const { read } = await req.json();
  await sql`UPDATE messages SET read=${read} WHERE id=${params.id}`;
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  await sql`DELETE FROM messages WHERE id=${params.id}`;
  return NextResponse.json({ ok: true });
}
