import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  return NextResponse.json(await sql`SELECT * FROM experiences ORDER BY "order"`);
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  const [e] = await sql`INSERT INTO experiences (role,company,period,description,tech,"order")
    VALUES (${b.role},${b.company},${b.period},${b.description},${b.tech??[]},${b.order??0}) RETURNING *`;
  return NextResponse.json(e, { status: 201 });
}
