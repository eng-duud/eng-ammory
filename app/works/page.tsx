"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        const [projectsRes, categoriesRes] = await Promise.all([
          fetch("/api/projects").then(r => r.ok ? r.json() : []).catch(() => []),
          fetch("/api/categories").then(r => r.ok ? r.json() : []).catch(() => [])
        ]);
        
        setProjects(Array.isArray(projectsRes) ? projectsRes : []);
        setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);
      } catch (error) {
        console.error("Load error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = (projects || []).filter((p:any) => {
    if (!p) return false;
    if (active === "all") return true;
    return p.category?.slug === active || p.categoryId === active || p.category?.id === active;
  });

  return (
    <div className="min-h-screen">
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <p className="text-xs font-dm uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>ما بنيته</p>
            <h1 className="display-lg mb-6" style={{color:"var(--text)"}}>معرض الأعمال</h1>
            <p className="font-dm max-w-xl leading-relaxed" style={{color:"var(--text-muted)"}}>
              مجموعة من أبرز المشاريع التي عملت عليها — من أنظمة معقدة إلى تجارب مستخدم مبهرة.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>setActive("all")} 
              className={`px-6 py-2 rounded-full text-sm transition-all ${active==="all" ? "bg-[var(--gold)] text-[var(--bg)]" : "bg-[var(--bg-200)] text-[var(--text-muted)] border border-[var(--glass-border)]"}`}>
              الكل
            </button>
            {(categories || []).map((c:any)=>(
              <button key={c.id} onClick={()=>setActive(c.slug || c.id)} 
                className={`px-6 py-2 rounded-full text-sm transition-all ${active===(c.slug || c.id) ? "bg-[var(--gold)] text-[var(--bg)]" : "bg-[var(--bg-200)] text-[var(--text-muted)] border border-[var(--glass-border)]"}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-t-[var(--gold)] rounded-full animate-spin"/>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project:any, i:number) => (
                  <motion.div key={project.id || i} layout
                    initial={{opacity:0,scale:.9,y:30}} animate={{opacity:1,scale:1,y:0}}
                    exit={{opacity:0,scale:.9}} transition={{duration:.45,delay:i*.05}}>
                    <Link href={`/works/${project.slug || project.id}`} className="block group project-card">
                      <div className="glass rounded-2xl overflow-hidden h-full transition-all duration-500 glass-hover border border-[var(--glass-border)]">
                        <div className="h-48 relative overflow-hidden"
                          style={{background:`linear-gradient(135deg,${project?.color || '#1a3a5c'} 0%,var(--bg) 100%)`}}>
                          {project?.coverImage ? (
                            <img src={project.coverImage} alt={project.title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center opacity-25">
                              <div className="space-y-2 w-4/5">
                                <div className="h-3 rounded-full w-3/4" style={{background:"rgba(255,255,255,0.4)"}}/>
                                <div className="h-2 rounded-full w-full" style={{background:"rgba(255,255,255,0.2)"}}/>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                            style={{background:"rgba(0,0,0,0.5)"}}>
                            <span className="w-10 h-10 rounded-lg backdrop-blur-sm flex items-center justify-center text-white"
                              style={{background:"rgba(255,255,255,0.15)"}}>
                              <ExternalLink size={16}/>
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="text-xs font-dm px-3 py-1 rounded-full backdrop-blur-sm"
                              style={{color:"rgba(255,255,255,.7)",background:"rgba(0,0,0,.4)",border:"1px solid rgba(255,255,255,.1)"}}>
                              {project.category?.name || "مشروع"}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="font-dm text-xs mb-2" style={{color:"var(--text-faint)"}}>{project.year || "2024"}</div>
                          <h3 className="font-playfair text-xl mb-2 group-hover:text-[var(--gold)] transition-colors"
                            style={{color:"var(--text)"}}>{project.title || "بدون عنوان"}</h3>
                          <p className="font-dm text-sm leading-relaxed mb-4 line-clamp-2" style={{color:"var(--text-faint)"}}>
                            {project.description || ""}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                              {(Array.isArray(project.tech) ? project.tech : []).slice(0, 3).map((t: any, idx: number) => (
                                <span key={idx} className="text-xs font-dm px-2 py-0.5 rounded"
                                  style={{color:"var(--text-muted)",background:"var(--bg-300)"}}>
                                  {typeof t === "string" ? t : t.name}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {project.githubUrl && <Github size={14} className="text-[var(--text-faint)]"/>}
                              {project.liveUrl && <Globe size={14} className="text-[var(--text-faint)]"/>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 font-dm" style={{color:"var(--text-faint)"}}>لا توجد مشاريع في هذا القسم</div>
          )}
        </div>
      </section>
    </div>
  );
}
