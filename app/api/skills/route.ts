import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  try {
    const groups = await prisma.skillGroup.findMany({
      include: {
        skills: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
    
    return NextResponse.json(groups);
  } catch (error: any) {
    console.error("Skills API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
