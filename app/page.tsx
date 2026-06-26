"use client";
<<<<<<< HEAD
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import AnimatedCounter from "./components/AnimatedCounter";

const KeyboardUniverse = dynamic(() => import("./components/KeyboardUniverse"), { ssr: false });
=======

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import { projects, stats, skills } from "./data";
import AnimatedCounter from "./components/AnimatedCounter";

const KeyboardUniverse = dynamic(() => import("./components/KeyboardUniverse"), {
  ssr: false,
  loading: () => null,
});
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
<<<<<<< HEAD
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
    // stats from settings-adjacent — fetch directly
    fetch("/api/admin/stats").catch(()=>null);
  }, []);

  // fetch stats publicly
  useEffect(() => {
    async function fetchStats() {
      try {
        const { neon } = await import("@neondatabase/serverless");
        // stats come from /api/stats-public – use a workaround via SQL in component
      } catch {}
    }
    // Use separate public stats endpoint
    fetch("/api/stats").then(r=>r.ok?r.json():null).then(d=>{ if(d) setStats(d); });
  }, []);

=======
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const featuredProjects = projects.filter((p) => p.featured);

export default function Home() {
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
  return (
    <>
      <KeyboardUniverse />

<<<<<<< HEAD
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
=======
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-10"
          >
            <div className="glow-dot" />
            <span className="text-[#C9A96E]/80 text-sm font-dm tracking-widest uppercase">
              متاح للمشاريع الجديدة
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="display-xl text-white leading-none"
            >
              عمرو خالد
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="display-xl gold-shimmer leading-none"
            >
              الجمل
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[#666] text-lg md:text-xl font-dm max-w-xl leading-relaxed mb-12"
          >
            مطور أنظمة ومواقع يجمع بين الدقة التقنية والإبداع البصري.
            <br />
            <span className="text-[#C9A96E]/70">أبني تجارب رقمية استثنائية.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/works"
              className="group relative px-8 py-4 bg-[#C9A96E] text-[#0D0D0D] font-dm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                استعرض أعمالي
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#E2C898] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-[#C9A96E]/30 text-[#C9A96E] font-dm font-medium rounded-lg hover:bg-[#C9A96E]/10 hover:border-[#C9A96E] transition-all duration-300"
            >
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
              تواصل معي
            </Link>
          </motion.div>
        </div>
<<<<<<< HEAD
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
=======

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#333]"
        >
          <span className="text-xs font-dm tracking-widest uppercase">اكتشف</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats ─── */}
      <section className="relative section-pad border-y border-[#1a1a1a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A96E]/2 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16,1,0.3,1] }}
                className="text-center"
              >
                <div className="display-md gold-text mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[#555] text-sm font-dm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Works ─── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-3">أبرز المشاريع</p>
              <h2 className="display-lg text-white">أعمال مختارة</h2>
            </div>
            <Link
              href="/works"
              className="hidden md:flex items-center gap-2 text-[#555] hover:text-[#C9A96E] text-sm font-dm transition-colors group"
            >
              عرض الكل
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="space-y-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16,1,0.3,1] }}
              >
                <Link href={`/works/${project.id}`}>
                  <div className="group glass glass-hover rounded-2xl p-8 md:p-10 transition-all duration-500 cursor-pointer overflow-hidden relative">
                    {/* Background accent */}
                    <div
                      className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${project.accent}15 0%, transparent 70%)`,
                        transform: "translate(30%, -30%)",
                      }}
                    />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-dm text-[#C9A96E]/60 uppercase tracking-widest border border-[#C9A96E]/20 px-3 py-1 rounded-full">
                            {project.categoryLabel}
                          </span>
                          <span className="text-xs font-dm text-[#444]">{project.year}</span>
                        </div>
                        <h3 className="font-playfair text-2xl md:text-3xl text-white mb-3 group-hover:text-[#C9A96E] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[#555] font-dm text-sm leading-relaxed max-w-lg">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-5">
                          {project.tech.slice(0, 4).map((t) => (
                            <span key={t} className="text-xs font-dm text-[#444] bg-[#1a1a1a] px-3 py-1 rounded-full">
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="text-xs font-dm text-[#444] bg-[#1a1a1a] px-3 py-1 rounded-full">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E]/40 group-hover:border-[#C9A96E] group-hover:text-[#C9A96E] group-hover:bg-[#C9A96E]/10 transition-all duration-300">
                          <ExternalLink size={20} />
                        </div>
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ── Skills ─────────────────────────────── */}
      {skills.length > 0 && (
        <section className="section-pad bg-alt">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
              <p className="text-xs font-dm uppercase tracking-widest mb-3" style={{color:"var(--gold)"}}>ما أتقنه</p>
              <h2 className="display-lg" style={{color:"var(--text)"}}>المهارات التقنية</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.flatMap((g:any)=>g.skills||[]).slice(0,12).map((skill:any,i:number)=>(
                <motion.div key={skill.id} initial={{opacity:0,x:i%2===0?-30:30}}
                  whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.06,duration:.6}}
                  className="glass rounded-xl p-5 glass-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-dm text-sm font-medium" style={{color:"var(--text)"}}>{skill.name}</span>
                    <span className="font-dm text-xs" style={{color:"var(--gold)"}}>{skill.level}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{background:"var(--bg-300)"}}>
                    <motion.div initial={{width:0}} whileInView={{width:`${skill.level}%`}} viewport={{once:true}}
                      transition={{delay:i*.06+.3,duration:1}}
                      className="h-full rounded-full"
                      style={{background:"linear-gradient(90deg,var(--gold),var(--gold-light))"}}/>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────── */}
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="glass rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{background:"radial-gradient(ellipse at center,var(--gold-subtle),transparent 70%)"}}/>
            <div className="relative z-10">
              <h2 className="font-playfair text-4xl md:text-5xl mb-4" style={{color:"var(--text)"}}>
                لديك مشروع<span className="gold-text"> في ذهنك؟</span>
              </h2>
              <p className="font-dm mb-10 max-w-lg mx-auto leading-relaxed" style={{color:"var(--text-muted)"}}>
                أنا هنا لتحويل أفكارك إلى واقع رقمي مذهل. لنتحدث عن مشروعك القادم.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 font-dm font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                style={{background:"var(--gold)",color:"var(--bg)"}}>
                ابدأ مشروعك الآن <ArrowLeft size={18}/>
=======
      {/* ─── Skills Orbit ─── */}
      <section className="section-pad bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-3">ما أتقنه</p>
            <h2 className="display-lg text-white">المهارات التقنية</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.slice(0, 12).map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16,1,0.3,1] }}
                className="glass rounded-xl p-5 group hover:border-[#C9A96E]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-dm text-white text-sm font-medium">{skill.name}</span>
                  <span className="font-dm text-[#C9A96E] text-xs">{skill.level}%</span>
                </div>
                <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.3, duration: 1, ease: [0.16,1,0.3,1] }}
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #C9A96E, #E2C898)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="glass rounded-3xl p-12 md:p-20 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="font-playfair text-4xl md:text-5xl text-white mb-4">
                لديك مشروع
                <span className="gold-text"> في ذهنك؟</span>
              </div>
              <p className="text-[#555] font-dm mb-10 max-w-lg mx-auto leading-relaxed">
                أنا هنا لتحويل أفكارك إلى واقع رقمي مذهل. لنتحدث عن مشروعك القادم.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C9A96E] text-[#0D0D0D] font-dm font-semibold rounded-xl hover:shadow-[0_0_40px_rgba(201,169,110,0.4)] transition-all duration-300 hover:scale-105"
              >
                ابدأ مشروعك الآن
                <ArrowLeft size={18} />
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
