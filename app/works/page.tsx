"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Globe } from "lucide-react";

export default function WorksPage() {
  const [projects, setProjects]     = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [active, setActive]         = useState("all");

  useEffect(() => {
    fetch("/api/projects").then(r=>r.json()).then(data => setProjects(Array.isArray(data) ? data : []));
    fetch("/api/categories").then(r=>r.json()).then(data => setCategories(Array.isArray(data) ? data : []));
  }, []);

  const filtered = active === "all" ? projects : projects.filter((p:any) => p.category?.slug === active);

  return (
    <>
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
            <button onClick={()=>setActive("all")} className={`filter-tab ${active==="all"?"active":""}`}>الكل</button>
            {(categories || []).map((c:any)=>(
              <button key={c.id} onClick={()=>setActive(c.slug)} className={`filter-tab ${active===c.slug?"active":""}`}>{c.name}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {(filtered || []).map((project:any, i:number) => (
                <motion.div key={project.id} layout
                  initial={{opacity:0,scale:.9,y:30}} animate={{opacity:1,scale:1,y:0}}
                  exit={{opacity:0,scale:.9}} transition={{duration:.45,delay:i*.05}}>
                  <Link href={`/works/${project.slug}`} className="block group project-card">
                    <div className="glass rounded-2xl overflow-hidden h-full transition-all duration-500 glass-hover">
                      <div className="h-48 relative overflow-hidden"
                        style={{background:`linear-gradient(135deg,${project.color} 0%,var(--bg) 100%)`}}>
                        {project.coverImage ? (
                          <img src={project.coverImage} alt={project.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-25">
                            <div className="space-y-2 w-4/5">
                              <div className="h-3 rounded-full w-3/4" style={{background:"rgba(255,255,255,0.4)"}}/>
                              <div className="h-2 rounded-full w-full" style={{background:"rgba(255,255,255,0.2)"}}/>
                              <div className="flex gap-2 mt-4">
                                {[.4,.2,.3].map((o,j)=>(
                                  <div key={j} className="h-14 flex-1 rounded-lg"
                                    style={{background:project.accent+Math.round(o*255).toString(16).padStart(2,"0")}}/>
                                ))}
                              </div>
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
                            {project.category?.name}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="font-dm text-xs mb-2" style={{color:"var(--text-faint)"}}>{project.year}</div>
                        <h3 className="font-playfair text-xl mb-2 group-hover:text-[var(--gold)] transition-colors"
                          style={{color:"var(--text)"}}>{project.title}</h3>
                        <p className="font-dm text-sm leading-relaxed mb-4 line-clamp-2" style={{color:"var(--text-faint)"}}>
                          {project.description}
                        </p>
	                        <div className="flex items-center justify-between">
	                          <div className="flex flex-wrap gap-1.5">
	                            {(Array.isArray(project?.tech) ? project.tech : []).slice(0, 3).map((t: any, idx: number) => (
	                              <span key={typeof t === "string" ? t : (t?.name || idx)}
	                                className="text-xs font-dm px-2 py-0.5 rounded"
	                                style={{color:"var(--text-muted)",background:"var(--bg-300)"}}>
	                                {typeof t === "string" ? t : t?.name}
	                              </span>
	                            ))}
	                          </div>
	                          <div className="flex items-center gap-2">
	                            {project?.githubUrl && (
	                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
	                                onClick={(e) => e.stopPropagation()}
	                                className="text-muted-foreground hover:text-gold transition-colors" title="Source Code">
	                                <Github size={14} />
	                              </a>
	                            )}
	                            {project?.liveUrl && (
	                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
	                                onClick={(e) => e.stopPropagation()}
	                                className="text-muted-foreground hover:text-gold transition-colors" title="Live Demo">
	                                <Globe size={14} />
	                              </a>
	                            )}
	                          </div>
	                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-24 font-dm" style={{color:"var(--text-faint)"}}>لا توجد مشاريع في هذا القسم</div>
          )}
        </div>
      </section>
    </>
  );
}
