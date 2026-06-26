"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import AnimatedCounter from "./components/AnimatedCounter";

const KeyboardUniverse = dynamic(() => import("./components/KeyboardUniverse"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16,1,0.3,1] as [number,number,number,number] },
  }),
};

export default function Home() {
  const [settings, setSettings] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats]       = useState<any[]>([]);
  const [skills, setSkills]     = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/settings").then(r=>r.ok?r.json():{}).then(setSettings);
    fetch("/api/projects?featured=true").then(r=>r.ok?r.json():[]).then(setProjects);
    fetch("/api/skills").then(r=>r.ok?r.json():[]).then(setSkills);
    fetch("/api/stats").then(r=>r.ok?r.json():[]).then(setStats);
  }, []);

  return (
    <>
      <KeyboardUniverse />

      {/* ── Hero ───────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background:"radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)" }}/>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          <motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{duration:.6}}
            className="inline-flex items-center gap-2 mb-10">
            <div className="glow-dot"/>
            <span className="text-sm font-dm tracking-widest uppercase" style={{color:"var(--gold)"}}>متاح للمشاريع الجديدة</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{y:"100%"}} animate={{y:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
              className="display-xl leading-none" style={{color:"var(--text)"}}>
              {settings.name?.split(" ").slice(0,2).join(" ") || "عمرو خالد"}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{y:"100%"}} animate={{y:0}} transition={{duration:1,delay:.1,ease:[0.16,1,0.3,1]}}
              className="display-xl gold-shimmer leading-none">
              {settings.name?.split(" ").slice(2).join(" ") || "الجمل"}
            </motion.h1>
          </div>

          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="text-lg md:text-xl font-dm max-w-xl leading-relaxed mb-12" style={{color:"var(--text-muted)"}}>
            {settings.title || "مطور أنظمة ومواقع بدقة عالية"}
            <br/><span style={{color:"var(--gold)"}}>أبني تجارب رقمية استثنائية.</span>
          </motion.p>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
            <Link href="/works"
              className="group relative px-8 py-4 font-dm font-semibold rounded-lg overflow-hidden transition-all duration-300"
              style={{background:"var(--gold)",color:"var(--bg)"}}>
              <span className="relative z-10 flex items-center gap-2">
                استعرض أعمالي <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
              </span>
            </Link>
            <Link href="/contact"
              className="px-8 py-4 font-dm font-medium rounded-lg transition-all duration-300"
              style={{border:"1px solid var(--glass-border)",color:"var(--gold)"}}>
              تواصل معي
            </Link>
          </motion.div>
        </div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{color:"var(--text-faint)"}}>
          <span className="text-xs font-dm tracking-widest uppercase">اكتشف</span>
          <motion.div animate={{y:[0,8,0]}} transition={{duration:1.5,repeat:Infinity}}><ChevronDown size={16}/></motion.div>
        </motion.div>
      </section>

      {/* ── Stats ──────────────────────────────── */}
      {stats.length > 0 && (
        <section className="relative section-pad" style={{borderTop:"1px solid var(--bg-300)",borderBottom:"1px solid var(--bg-300)"}}>
          <div className="absolute inset-0 pointer-events-none"
            style={{background:"linear-gradient(to bottom, transparent, var(--gold-subtle), transparent)"}}/>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s:any,i:number)=>(
                <motion.div key={s.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*.1}} className="text-center">
                  <div className="display-md gold-text mb-2">
                    <AnimatedCounter value={s.value} suffix={s.suffix}/>
                  </div>
                  <div className="text-sm font-dm" style={{color:"var(--text-faint)"}}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Projects ───────────────────── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-dm uppercase tracking-widest mb-3" style={{color:"var(--gold)"}}>أبرز المشاريع</p>
              <h2 className="display-lg" style={{color:"var(--text)"}}>أعمال مختارة</h2>
            </div>
            <Link href="/works" className="hidden md:flex items-center gap-2 text-sm font-dm transition-colors group"
              style={{color:"var(--text-faint)"}}>
              عرض الكل <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/>
            </Link>
          </motion.div>

          <div className="space-y-5">
            {projects.map((project:any,i:number)=>(
              <motion.div key={project.id} initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.15,duration:.8}}>
                <Link href={`/works/${project.slug}`}>
                  <div className="group glass glass-hover rounded-2xl p-8 md:p-10 relative overflow-hidden cursor-pointer">
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{background:`radial-gradient(circle,${project.accent}20 0%,transparent 70%)`,transform:"translate(30%,-30%)"}}/>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-dm uppercase tracking-widest border px-3 py-1 rounded-full"
                            style={{color:"var(--gold)",borderColor:"var(--glass-border)"}}>{project.category_name}</span>
                          <span className="text-xs font-dm" style={{color:"var(--text-faint)"}}>{project.year}</span>
                        </div>
                        <h3 className="font-playfair text-2xl md:text-3xl mb-3 group-hover:text-[var(--gold)] transition-colors"
                          style={{color:"var(--text)"}}>{project.title}</h3>
                        <p className="text-sm font-dm leading-relaxed max-w-lg" style={{color:"var(--text-faint)"}}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-5">
                          {(Array.isArray(project.tech)?project.tech:[]).slice(0,4).map((t:any)=>(
                            <span key={typeof t==="string"?t:t.name}
                              className="text-xs font-dm px-3 py-1 rounded-full"
                              style={{color:"var(--text-muted)",background:"var(--bg-200)"}}>
                              {typeof t==="string"?t:t.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{border:"1px solid var(--glass-border)",color:"var(--text-faint)"}}>
                        <ExternalLink size={20}/>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────── */}
      <section className="section-pad" style={{background:"var(--bg-100)"}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs font-dm uppercase tracking-widest mb-3" style={{color:"var(--gold)"}}>الخبرات التقنية</p>
            <h2 className="display-lg" style={{color:"var(--text)"}}>المهارات والأدوات</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill:any,i:number)=>(
              <motion.div key={skill.id} initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}}
                viewport={{once:true}} transition={{delay:i*.05}}
                className="glass p-6 rounded-2xl text-center group transition-all duration-300">
                <div className="font-dm text-sm font-medium mb-1 group-hover:text-[var(--gold)] transition-colors"
                  style={{color:"var(--text)"}}>{skill.name}</div>
                <div className="text-[10px] font-dm uppercase tracking-tighter" style={{color:"var(--text-faint)"}}>{skill.level}%</div>
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{width:0}} whileInView={{width:`${skill.level}%`}}
                    viewport={{once:true}} transition={{duration:1,delay:i*.05}}
                    className="h-full" style={{background:"var(--gold)"}}/>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
