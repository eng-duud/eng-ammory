import { NextResponse } from "next/server";
import sql from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function GET() {
  const guard = await requireAdmin(); if (guard) return guard;
  const rows = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug,
      COALESCE((SELECT json_agg(pt.name) FROM project_tech pt WHERE pt.project_id=p.id),'[]') as tech
    FROM projects p JOIN categories c ON p.category_id=c.id ORDER BY p.order`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await requireAdmin(); if (guard) return guard;
  const b = await req.json();
  const slugBase = b.slug || b.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]/g,"");
  const slug = `${slugBase}-${Date.now().toString(36)}`;
  const [proj] = await sql`
    INSERT INTO projects (title,title_en,slug,description,description_long,category_id,live_url,github_url,featured,hidden,"order",color,accent,year,cover_image)
    VALUES (${b.title},${b.titleEn||null},${slug},${b.description},${b.descriptionLong||null},
            ${b.categoryId},${b.liveUrl||null},${b.githubUrl||null},${b.featured??false},${b.hidden??false},
            ${b.order??0},${b.color||'#1a3a5c'},${b.accent||'#4a9eff'},${b.year||null},${b.coverImage||null})
    RETURNING *`;
  if (b.tech?.length) {
    for (const t of b.tech) {
      await sql`INSERT INTO project_tech (project_id,name) VALUES (${proj.id},${t})`;
    }
  }
  return NextResponse.json(proj, { status: 201 });
}
