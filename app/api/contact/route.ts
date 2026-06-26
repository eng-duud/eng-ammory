import { NextResponse } from "next/server";
import sql from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await sql`INSERT INTO messages (name, email, subject, message)
              VALUES (${name}, ${email}, ${subject ?? null}, ${message})`;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
