import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const rows = await sql`SELECT p.*,c.name as category_name FROM projects p JOIN categories c ON p.category_id=c.id WHERE p.id=${params.id}`;
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const p = rows[0] as any;
  p.tech   = await sql`SELECT id,name FROM project_tech WHERE project_id=${params.id}`;
  p.images = await sql`SELECT * FROM project_images WHERE project_id=${params.id} ORDER BY "order"`;
  return NextResponse.json(p);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  // Convert camelCase to snake_case for database columns
  const projectData = {
    title: b.title,
    title_en: b.titleEn || null,
    description: b.description,
    description_long: b.descriptionLong || null,
    category_id: b.categoryId,
    live_url: b.liveUrl || null,
    github_url: b.githubUrl || null,
    featured: b.featured ?? false,
    hidden: b.hidden ?? false,
    order: b.order ?? 0,
    color: b.color || '#1a3a5c',
    accent: b.accent || '#4a9eff',
    year: b.year || null,
    cover_image: b.coverImage || null,
  };
  const [proj] = await sql`
    UPDATE projects SET
      title=${projectData.title}, title_en=${projectData.title_en}, description=${projectData.description},
      description_long=${projectData.description_long}, category_id=${projectData.category_id},
      live_url=${projectData.live_url}, github_url=${projectData.github_url},
      featured=${projectData.featured}, hidden=${projectData.hidden},
      "order"=${projectData.order}, color=${projectData.color}, accent=${projectData.accent},
      year=${projectData.year}, cover_image=${projectData.cover_image}
    WHERE id=${params.id} RETURNING *`;
  if (b.tech) {
    await sql`DELETE FROM project_tech WHERE project_id=${params.id}`;
    for (const t of b.tech) {
      await sql`INSERT INTO project_tech (project_id,name) VALUES (${params.id},${t})`;
    }
  }
  return NextResponse.json(proj);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin(); if (guard) return guard;
  await sql`DELETE FROM projects WHERE id=${params.id}`;
  return NextResponse.json({ ok: true });
}
