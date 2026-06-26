"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Globe } from "lucide-react";

export default function WorksPage() {
  const [projects, setProjects]     = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [active, setActive]         = useState("all");
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch("/api/projects").then(r => r.ok ? r.json() : []).catch(() => []),
          fetch("/api/categories").then(r => r.ok ? r.json() : []).catch(() => [])
        ]);
        setProjects(Array.isArray(pRes) ? pRes : []);
        setCategories(Array.isArray(cRes) ? cRes : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = (projects || []).filter(p => {
    if (!p) return false;
    if (active === "all") return true;
    return p.category?.slug === active || p.categoryId === active;
  });

  return (
    <div className="min-h-screen pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>ما بنيته</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{color:"var(--text)"}}>معرض الأعمال</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          <button onClick={()=>setActive("all")} 
            className={`px-6 py-2 rounded-full text-sm transition-all ${active==="all" ? "bg-[var(--gold)] text-[var(--bg)]" : "bg-[var(--bg-200)] text-[var(--text-muted)] border border-[var(--glass-border)]"}`}>
            الكل
          </button>
          {categories.map((c:any)=>(
            <button key={c.id} onClick={()=>setActive(c.slug || c.id)} 
              className={`px-6 py-2 rounded-full text-sm transition-all ${active===(c.slug || c.id) ? "bg-[var(--gold)] text-[var(--bg)]" : "bg-[var(--bg-200)] text-[var(--text-muted)] border border-[var(--glass-border)]"}`}>
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-[var(--gold)] rounded-full animate-spin"/>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p:any) => (
              <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
                <Link href={`/works/${p.slug || p.id}`} className="group block h-full">
                  <div className="bg-[var(--bg-200)] border border-[var(--glass-border)] rounded-2xl overflow-hidden h-full transition-all hover:translate-y-[-4px]">
                    <div className="h-48 relative overflow-hidden bg-[var(--bg-300)]">
                      {p.coverImage ? (
                        <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20" style={{background: p.color || "#1a3a5c"}}>
                          <span className="text-4xl font-bold text-white">{(p.title || "P").charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs mb-2" style={{color:"var(--text-faint)"}}>{p.year || "2024"}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--gold)] transition-colors" style={{color:"var(--text)"}}>{p.title || "مشروع"}</h3>
                      <p className="text-sm line-clamp-2 mb-4" style={{color:"var(--text-muted)"}}>{p.description || ""}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {(p.tech || []).slice(0, 3).map((t: any, idx: number) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-300)] text-[var(--text-muted)]">
                              {typeof t === "string" ? t : t.name}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {p.githubUrl && <Github size={16} className="text-[var(--text-faint)]"/>}
                          {p.liveUrl && <Globe size={16} className="text-[var(--text-faint)]"/>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-[var(--text-faint)]">لا توجد مشاريع حالياً</div>
        )}
      </div>
    </div>
  );
}
