import { NextResponse } from "next/server";
import { getSettings } from "@/app/lib/db";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
