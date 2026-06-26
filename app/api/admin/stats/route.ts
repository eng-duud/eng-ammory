import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  return NextResponse.json(await sql`SELECT * FROM stats ORDER BY "order"`);
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  const [s] = await sql`INSERT INTO stats (label,value,suffix,"order") VALUES (${b.label},${b.value},${b.suffix??'+'},${b.order??0}) RETURNING *`;
  return NextResponse.json(s, { status: 201 });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  const [s] = await sql`UPDATE stats SET label=${b.label},value=${b.value},suffix=${b.suffix??'+'},"order"=${b.order??0} WHERE id=${b.id} RETURNING *`;
  return NextResponse.json(s);
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const { id } = await req.json();
  await sql`DELETE FROM stats WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
