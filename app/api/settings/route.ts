import { NextResponse } from "next/server";
import { getSettings } from "@/app/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
