import { NextResponse } from "next/server";
import sql from "@/app/lib/db";

export async function GET() {
  try {
    const groups = await sql`SELECT * FROM skill_groups ORDER BY "order"`;
    const skills = await sql`SELECT * FROM skills ORDER BY "order"`;
    const result = groups.map((g: any) => ({
      ...g,
      skills: skills.filter((s: any) => s.group_id === g.id),
    }));
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
