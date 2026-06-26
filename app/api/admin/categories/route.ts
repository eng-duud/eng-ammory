import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  return NextResponse.json(await sql`SELECT * FROM categories ORDER BY "order"`);
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const { name, order } = await req.json();
  const slug = name.toLowerCase().replace(/\s+/g,"-");
  const [c] = await sql`INSERT INTO categories (name,slug,"order") VALUES (${name},${slug},${order??0}) RETURNING *`;
  return NextResponse.json(c, { status: 201 });
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const { id } = await req.json();
  await sql`DELETE FROM categories WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
