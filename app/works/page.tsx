"use client";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function WorksPage() {
  const [projects, setProjects]     = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [active, setActive]         = useState("all");

  useEffect(() => {
    fetch("/api/projects").then(r=>r.json()).then(setProjects);
    fetch("/api/categories").then(r=>r.json()).then(setCategories);
  }, []);

  const filtered = active === "all" ? projects : projects.filter((p:any) => p.category_slug === active);

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <p className="text-xs font-dm uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>ما بنيته</p>
            <h1 className="display-lg mb-6" style={{color:"var(--text)"}}>معرض الأعمال</h1>
            <p className="font-dm max-w-xl leading-relaxed" style={{color:"var(--text-muted)"}}>
              مجموعة من أبرز المشاريع — من أنظمة معقدة إلى تجارب مستخدم مبهرة.
=======

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, GitFork } from "lucide-react";
import { projects } from "../data";

const filters = [
  { id: "all", label: "الكل" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "mobile", label: "Mobile" },
];

export default function WorksPage() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-4">ما بنيته</p>
            <h1 className="display-lg text-white mb-6">
              معرض الأعمال
            </h1>
            <p className="text-[#555] font-dm max-w-xl leading-relaxed">
              مجموعة من أبرز المشاريع التي عملت عليها — من أنظمة معقدة إلى تجارب مستخدم مبهرة.
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
            </p>
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>setActive("all")} className={`filter-tab ${active==="all"?"active":""}`}>الكل</button>
            {categories.map((c:any)=>(
              <button key={c.id} onClick={()=>setActive(c.slug)} className={`filter-tab ${active===c.slug?"active":""}`}>{c.name}</button>
            ))}
          </div>
        </div>
      </section>

=======
      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`filter-tab ${active === f.id ? "active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
<<<<<<< HEAD
              {filtered.map((project:any, i:number) => (
                <motion.div key={project.id} layout
                  initial={{opacity:0,scale:.9,y:30}} animate={{opacity:1,scale:1,y:0}}
                  exit={{opacity:0,scale:.9}} transition={{duration:.45,delay:i*.05}}>
                  <Link href={`/works/${project.slug}`} className="block group project-card">
                    <div className="glass rounded-2xl overflow-hidden h-full transition-all duration-500 glass-hover">
                      <div className="h-48 relative overflow-hidden"
                        style={{background:`linear-gradient(135deg,${project.color} 0%,var(--bg) 100%)`}}>
                        {project.cover_image ? (
                          <img src={project.cover_image} alt={project.title}
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
                            {project.category_name}
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
                        <div className="flex flex-wrap gap-1.5">
                          {(Array.isArray(project.tech)?project.tech:[]).slice(0,3).map((t:any)=>(
                            <span key={typeof t==="string"?t:t.name}
                              className="text-xs font-dm px-2 py-0.5 rounded"
                              style={{color:"var(--text-muted)",background:"var(--bg-300)"}}>
                              {typeof t==="string"?t:t.name}
                            </span>
                          ))}
=======
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16,1,0.3,1] }}
                >
                  <Link href={`/works/${project.id}`} className="block group project-card">
                    <div className="glass rounded-2xl overflow-hidden border border-[#1a1a1a] group-hover:border-[#C9A96E]/20 transition-all duration-500 h-full">
                      {/* Project color block */}
                      <div
                        className="h-48 relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${project.color} 0%, #0d0d0d 100%)` }}
                      >
                        {/* Mock UI pattern */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="space-y-2 w-4/5 opacity-30">
                            <div className="h-3 bg-white/20 rounded-full w-3/4" />
                            <div className="h-2 bg-white/10 rounded-full w-full" />
                            <div className="h-2 bg-white/10 rounded-full w-2/3" />
                            <div className="mt-4 flex gap-2">
                              <div className="h-16 w-1/3 rounded-lg" style={{ background: project.accent + "40" }} />
                              <div className="h-16 w-1/3 rounded-lg" style={{ background: project.accent + "20" }} />
                              <div className="h-16 w-1/3 rounded-lg" style={{ background: project.accent + "30" }} />
                            </div>
                          </div>
                        </div>

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-3">
                            <span className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                              <ExternalLink size={16} />
                            </span>
                            <span className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                              <GitFork size={16} />
                            </span>
                          </div>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 right-4">
                          <span className="text-xs font-dm text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                            {project.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-[#444] font-dm text-xs mb-2">{project.year}</div>
                        <h3 className="font-playfair text-xl text-white mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[#444] font-dm text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="text-xs font-dm text-[#333] bg-[#1a1a1a] px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-xs font-dm text-[#333] bg-[#1a1a1a] px-2 py-0.5 rounded">
                              +{project.tech.length - 3}
                            </span>
                          )}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
<<<<<<< HEAD
          {filtered.length === 0 && (
            <div className="text-center py-24 font-dm" style={{color:"var(--text-faint)"}}>لا توجد مشاريع في هذا القسم</div>
          )}
=======
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
        </div>
      </section>
    </>
  );
}
