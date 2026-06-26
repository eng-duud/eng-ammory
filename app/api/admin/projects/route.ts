import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  const rows = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug,
      COALESCE((SELECT json_agg(pt.name) FROM project_tech pt WHERE pt.project_id=p.id),\'[]\') as tech
    FROM projects p JOIN categories c ON p.category_id=c.id ORDER BY p.order`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
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
    color: b.color || \'#1a3a5c\',
    accent: b.accent || \'#4a9eff\',
    year: b.year || null,
    cover_image: b.coverImage || null,
  };

  const slugBase = b.slug || b.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]/g,"");
  const slug = `${slugBase}-${Date.now().toString(36)}`;

  const [proj] = await sql`
    INSERT INTO projects (title,title_en,slug,description,description_long,category_id,live_url,github_url,featured,hidden,"order",color,accent,year,cover_image)
    VALUES (
      ${projectData.title}, ${projectData.title_en}, ${slug}, ${projectData.description},
      ${projectData.description_long}, ${projectData.category_id}, ${projectData.live_url},
      ${projectData.github_url}, ${projectData.featured}, ${projectData.hidden},
      ${projectData.order}, ${projectData.color}, ${projectData.accent},
      ${projectData.year}, ${projectData.cover_image}
    )
    RETURNING *`;

  if (b.tech?.length) {
    // Delete existing tech entries for this project to handle updates correctly
    await sql`DELETE FROM project_tech WHERE project_id=${proj.id}`;
    for (const t of b.tech) {
      await sql`INSERT INTO project_tech (project_id,name) VALUES (${proj.id},${t})`;
    }
  }
  return NextResponse.json(proj, { status: 201 });
}
