import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  const rows = await sql`SELECT key,value FROM settings`;
  return NextResponse.json(Object.fromEntries(rows.map((r:any)=>[r.key,r.value])));
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const body = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await sql`INSERT INTO settings (key,value) VALUES (${key},${value as string})
              ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value`;
  }
  return NextResponse.json({ ok: true });
}
