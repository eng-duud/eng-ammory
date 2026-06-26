import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  const groups = await sql`SELECT * FROM skill_groups ORDER BY "order"`;
  const skills = await sql`SELECT * FROM skills ORDER BY "order"`;
  return NextResponse.json({ groups, skills });
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  if (b.type === "group") {
    const slug = b.name.toLowerCase().replace(/\s+/g,"-");
    const [g] = await sql`INSERT INTO skill_groups (name,slug,"order") VALUES (${b.name},${slug},${b.order??0}) RETURNING *`;
    return NextResponse.json(g, { status: 201 });
  }
  const [s] = await sql`INSERT INTO skills (name,level,"order",group_id) VALUES (${b.name},${b.level??80},${b.order??0},${b.groupId}) RETURNING *`;
  return NextResponse.json(s, { status: 201 });
}
