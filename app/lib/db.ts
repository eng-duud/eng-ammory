import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export default sql;

// ─── typed query helpers ────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  const rows = await sql`SELECT key, value FROM settings`;
  return Object.fromEntries(rows.map((r: any) => [r.key, r.value]));
}

export async function getProjects(opts?: { featured?: boolean; hidden?: boolean }) {
  if (opts?.featured) {
    return sql`SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM projects p JOIN categories c ON p.category_id = c.id
      WHERE p.featured = true AND p.hidden = false
      ORDER BY p.order ASC`;
  }
  if (opts?.hidden === false) {
    return sql`SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM projects p JOIN categories c ON p.category_id = c.id
      WHERE p.hidden = false ORDER BY p.order ASC`;
  }
  return sql`SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM projects p JOIN categories c ON p.category_id = c.id
    ORDER BY p.order ASC`;
}

export async function getProjectBySlug(slug: string) {
  const rows = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM projects p JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ${slug}`;
  if (!rows[0]) return null;
  const project = rows[0] as any;
  project.tech   = await sql`SELECT name FROM project_tech WHERE project_id = ${project.id} ORDER BY id`;
  project.images = await sql`SELECT * FROM project_images WHERE project_id = ${project.id} ORDER BY "order"`;
  return project;
}

export async function getProjectById(id: string) {
  const rows = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM projects p JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${id}`;
  if (!rows[0]) return null;
  const project = rows[0] as any;
  project.tech   = await sql`SELECT id, name FROM project_tech WHERE project_id = ${id} ORDER BY id`;
  project.images = await sql`SELECT * FROM project_images WHERE project_id = ${id} ORDER BY "order"`;
  return project;
}
