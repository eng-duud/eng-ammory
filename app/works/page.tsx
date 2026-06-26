import prisma from "@/app/lib/db";
import Link from "next/link";
import { Github, Globe, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function WorksPage() {
  const projects = await prisma.project.findMany({
    where: { hidden: false },
    include: { category: true, tech: true },
    orderBy: { order: 'asc' },
  }).catch(() => []);

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  }).catch(() => []);

  return (
    <div className="min-h-screen pt-36 pb-24 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest mb-4 text-[var(--gold)]">ما بنيته</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text)]">معرض الأعمال</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          <Link href="/works" 
            className="px-6 py-2 rounded-full text-sm transition-all bg-[var(--gold)] text-[var(--bg)]">
            الكل
          </Link>
          {categories.map((c: any) => (
            <Link key={c.id} href={`/works?category=${c.slug || c.id}`}
              className="px-6 py-2 rounded-full text-sm transition-all bg-[var(--bg-200)] text-[var(--text-muted)] border border-[var(--glass-border)]">
              {c.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: any) => (
            <Link key={p.id} href={`/works/${p.slug || p.id}`} className="group block h-full">
              <div className="bg-[var(--bg-200)] border border-[var(--glass-border)] rounded-2xl overflow-hidden h-full transition-all hover:translate-y-[-4px]">
                <div className="h-48 relative overflow-hidden bg-[var(--bg-300)]">
                  {p.coverImage ? (
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20" style={{ background: p.color || "#1a3a5c" }}>
                      <span className="text-4xl font-bold text-white">{(p.title || "P").charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 rounded-full backdrop-blur-sm bg-[rgba(0,0,0,0.4)] text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.1)]">
                      {p.category?.name || "مشروع"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs mb-2 text-[var(--text-faint)]">{p.year || "2024"}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--gold)] transition-colors text-[var(--text)]">{p.title || "مشروع"}</h3>
                  <p className="text-sm line-clamp-2 mb-4 text-[var(--text-muted)]">{p.description || ""}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {(p.tech || []).slice(0, 3).map((t: any, idx: number) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-300)] text-[var(--text-muted)]">
                          {typeof t === "string" ? t : t.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {p.githubUrl && <Github size={16} className="text-[var(--text-faint)]" />}
                      {p.liveUrl && <Globe size={16} className="text-[var(--text-faint)]" />}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-24 text-[var(--text-faint)]">لا توجد مشاريع حالياً</div>
        )}
      </div>
    </div>
  );
}
