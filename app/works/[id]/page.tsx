"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.id as string;
    if (!slug) return;

    const loadData = async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        const p = res.ok ? await res.json() : null;
        
        if (p && !p.error) {
          setProject(p);
          const allRes = await fetch("/api/projects");
          const all = allRes.ok ? await allRes.json() : [];
          if (Array.isArray(all)) {
            setRelated(all.filter((x:any) => x.slug !== slug && x.id !== p.id).slice(0, 3));
          }
        } else {
          setProject({ error: true });
        }
      } catch (e) {
        console.error(e);
        setProject({ error: true });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-8 h-8 border-2 border-t-[var(--gold)] rounded-full animate-spin" style={{borderColor:"var(--bg-300)", borderTopColor:"var(--gold)"}}/>
    </div>
  );

  if (!project || project.error) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="text-center">
        <div className="text-6xl font-bold mb-4" style={{color:"var(--text-faint)"}}>404</div>
        <p className="mb-8 text-[var(--text-muted)]">المشروع غير موجود</p>
        <Link href="/works" style={{color:"var(--gold)"}} className="font-dm hover:underline">العودة للأعمال</Link>
      </div>
    </div>
  );

  const techList: string[] = Array.isArray(project.tech) ? project.tech.map((t:any) => typeof t === "string" ? t : t.name) : [];
  const images: any[] = Array.isArray(project.images) ? project.images : [];

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{background:`radial-gradient(ellipse at top right,${project.color || 'var(--gold)'}50 0%,transparent 60%)`}}/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm font-dm mb-10" style={{color:"var(--text-faint)"}}>
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link href="/works" className="hover:text-[var(--gold)] transition-colors">الأعمال</Link>
            <span className="mx-2">/</span>
            <span style={{color:"var(--gold)"}}>{project.title || "مشروع"}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="opacity-100 transform-none">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-dm uppercase tracking-widest border px-3 py-1 rounded-full"
                  style={{color:"var(--gold)",borderColor:"var(--glass-border)"}}>{project.category?.name || "مشروع"}</span>
                {project.year && <span className="text-xs font-dm" style={{color:"var(--text-faint)"}}>{project.year}</span>}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{color:"var(--text)"}}>{project.title}</h1>
              <p className="font-dm leading-relaxed text-lg mb-8" style={{color:"var(--text-muted)"}}>
                {project.descriptionLong || project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 font-dm font-semibold rounded-lg transition-all bg-[var(--gold)] text-[var(--bg)]">
                    المشروع الحي
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 font-dm rounded-lg transition-all border border-[var(--glass-border)]"
                    style={{color:"var(--gold)"}}>
                    الكود المصدري
                  </a>
                )}
              </div>
            </div>

            <div className="opacity-100 transform-none">
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
            <p className="text-xs font-dm uppercase tracking-widest mb-6" style={{color:"var(--gold)"}}>التقنيات المستخدمة</p>
            <div className="flex flex-wrap gap-3">
              {techList.map((tech:string, i:number)=>(
                <span key={i} className="font-dm text-sm px-5 py-2.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-200)] text-[var(--text)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>معرض الصور</p>
            <h2 className="text-3xl font-bold mb-10" style={{color:"var(--text)"}}>لقطات من المشروع</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((img:any, i:number)=>(
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
            <p className="text-xs font-dm uppercase tracking-widest mb-10" style={{color:"var(--text-faint)"}}>مشاريع ذات صلة</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p:any)=>(
                <Link key={p.id} href={`/works/${p.slug || p.id}`} className="group">
                  <div className="bg-[var(--bg-200)] border border-[var(--glass-border)] rounded-2xl overflow-hidden transition-all hover:translate-y-[-4px]">
                    <div className="h-40 relative overflow-hidden bg-[var(--bg-300)]">
                      {p.coverImage && <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"/>}
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold" style={{color:"var(--text)"}}>{p.title}</h4>
                      <p className="text-xs mt-1" style={{color:"var(--text-faint)"}}>{p.category?.name || "مشروع"}</p>
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
