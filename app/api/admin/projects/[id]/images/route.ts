import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const { url, alt, order } = await req.json();
  const [img] = await sql`
    INSERT INTO project_images (project_id, url, alt, "order")
    VALUES (${params.id}, ${url}, ${alt||null}, ${order??0}) RETURNING *`;
  return NextResponse.json(img, { status: 201 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const { imageId } = await req.json();
  await sql`DELETE FROM project_images WHERE id=${imageId} AND project_id=${params.id}`;
  return NextResponse.json({ ok: true });
}
