import prisma from "@/app/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        category: true,
        tech: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

async function getRelatedProjects(slug: string, categoryId: string, currentId: string) {
  try {
    const related = await prisma.project.findMany({
      where: {
        categoryId,
        id: { not: currentId },
        hidden: false,
      },
      take: 3,
      include: { category: true },
    });
    return related;
  } catch (error) {
    return [];
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const slug = params.id;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(slug, project.categoryId, project.id);
  const techList = project.tech || [];
  const images = project.images || [];

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{background:`radial-gradient(ellipse at top right,${project.color || '#C9A96E'}50 0%,transparent 60%)`}}/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm font-dm mb-10 text-[var(--text-faint)]">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link href="/works" className="hover:text-[var(--gold)] transition-colors">الأعمال</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--gold)]">{project.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-dm uppercase tracking-widest border px-3 py-1 rounded-full border-[var(--glass-border)] text-[var(--gold)]">
                  {project.category?.name || "مشروع"}
                </span>
                {project.year && <span className="text-xs font-dm text-[var(--text-faint)]">{project.year}</span>}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text)]">{project.title}</h1>
              <p className="font-dm leading-relaxed text-lg mb-8 text-[var(--text-muted)]">
                {project.descriptionLong || project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 font-dm font-semibold rounded-lg transition-all bg-[var(--gold)] text-[var(--bg)] hover:opacity-90">
                    المشروع الحي
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 font-dm rounded-lg transition-all border border-[var(--glass-border)] text-[var(--gold)] hover:bg-[var(--gold-subtle)]">
                    الكود المصدري
                  </a>
                )}
              </div>
            </div>

            <div>
              <div className="aspect-video rounded-2xl relative overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-200)]">
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover"/>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20" style={{background: project.color || "var(--gold)"}}>
                    <span className="text-6xl font-bold text-white">{(project.title || "P").charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {techList.length > 0 && (
        <section className="py-16 border-y border-[var(--glass-border)]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-6 text-[var(--gold)]">التقنيات المستخدمة</p>
            <div className="flex flex-wrap gap-3">
              {techList.map((t: any, i: number)=>(
                <span key={i} className="font-dm text-sm px-5 py-2.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-200)] text-[var(--text)]">
                  {typeof t === "string" ? t : t.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-4 text-[var(--gold)]">معرض الصور</p>
            <h2 className="text-3xl font-bold mb-10 text-[var(--text)]">لقطات من المشروع</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((img: any, i: number)=>(
                <div key={i} className={`rounded-xl overflow-hidden border border-[var(--glass-border)] ${i === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}`}>
                  <img src={img.url} alt={img.alt || project.title} className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-10 text-[var(--text-faint)]">مشاريع ذات صلة</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p: any)=>(
                <Link key={p.id} href={`/works/${p.slug || p.id}`} className="group">
                  <div className="bg-[var(--bg-200)] border border-[var(--glass-border)] rounded-2xl overflow-hidden transition-all hover:translate-y-[-4px]">
                    <div className="h-40 relative overflow-hidden bg-[var(--bg-300)]">
                      {p.coverImage && <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"/>}
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[var(--text)]">{p.title}</h4>
                      <p className="text-xs mt-1 text-[var(--text-faint)]">{p.category?.name || "مشروع"}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
