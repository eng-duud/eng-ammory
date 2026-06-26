"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, MapPin, Mail, Calendar } from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";

export default function AboutPage() {
  const [settings, setSettings]       = useState<any>({});
  const [stats, setStats]             = useState<any[]>([]);
  const [skills, setSkills]           = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/settings?t=${Date.now()}`).then(r=>r.json()).then(data => setSettings(data || {}));
    fetch("/api/stats").then(r=>r.json()).then(data => setStats(Array.isArray(data) ? data : []));
    fetch("/api/skills").then(r=>r.json()).then(data => setSkills(Array.isArray(data) ? data : []));
    fetch("/api/experiences").then(r=>r.json()).then(data => setExperiences(Array.isArray(data) ? data : []));
  },[]);

  return (
    <>
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{background:"radial-gradient(circle,var(--gold-subtle),transparent 70%)"}}/>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <p className="text-xs font-dm uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>من أنا</p>
            <h1 className="display-lg mb-8" style={{color:"var(--text)"}}>
              مطور يؤمن بأن الكود<br/><span className="gold-text">هو فن بلغة مختلفة</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.8}}>
              <div className="relative w-full max-w-sm mb-10 mx-auto lg:mx-0">
                <div className="aspect-square rounded-2xl overflow-hidden glass border relative"
                  style={{borderColor:"var(--glass-border)"}}>
                  {settings?.profileImage ? (
                    <img src={settings.profileImage} alt={settings?.name} className="w-full h-full object-cover"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"
                      style={{background:"linear-gradient(135deg,var(--bg-200),var(--bg))"}}>
                      <div className="text-center">
                        <div className="font-playfair text-[120px] leading-none select-none"
                          style={{color:"var(--gold-subtle)"}}>ع</div>
                        <div className="font-dm text-sm" style={{color:"var(--text-faint)"}}>{settings?.name}</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{background:"radial-gradient(circle at 30% 30%,var(--gold-subtle),transparent 60%)"}}/>
                </div>
                <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-xl -z-10 border" style={{borderColor:"var(--glass-border)"}}/>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  {icon:MapPin,  text:settings?.location||""},
                  {icon:Mail,    text:settings?.email||""},
                  {icon:Calendar,text:"6+ سنوات من الخبرة"},
                ].map(({icon:Icon,text})=>text?(
                  <div key={text} className="flex items-center gap-3 text-sm font-dm" style={{color:"var(--text-muted)"}}>
                    <Icon size={14} style={{color:"var(--gold)"}}/>
                    <span>{text}</span>
                  </div>
                ):null)}
              </div>
              {settings?.cvUrl ? (
                <a href="/api/download-cv" download className="inline-flex items-center gap-2 px-6 py-3 text-sm font-dm rounded-lg transition-all hover:opacity-80"
                  style={{border:"1px solid var(--glass-border)",color:"var(--gold)"}}>
                  <Download size={15}/> تحميل السيرة الذاتية
                </a>
              ) : (
                <button disabled className="inline-flex items-center gap-2 px-6 py-3 text-sm font-dm rounded-lg transition-all opacity-50 cursor-not-allowed"
                  style={{border:"1px solid var(--glass-border)",color:"var(--gold)"}}>
                  <Download size={15}/> السيرة الذاتية غير متوفرة
                </button>
              )}
            </motion.div>

            <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.8}}>
              <div className="space-y-5 font-dm leading-relaxed mb-10" style={{color:"var(--text-muted)"}}>
                <p className="text-lg" style={{color:"var(--text)"}}>
                  أنا <strong style={{color:"var(--text)"}}>{settings?.name}</strong>، {settings?.title}.
                </p>
                <p>{settings?.bio||"مطور متكامل يجمع بين الدقة التقنية والإبداع البصري."}</p>
              </div>
              {(stats || []).length>0 && (
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s:any,i:number)=>(
                    <motion.div key={s.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                      viewport={{once:true}} transition={{delay:i*.1}} className="glass rounded-xl p-5">
                      <div className="font-playfair text-3xl gold-text font-bold mb-1">
                        <AnimatedCounter value={s.value} suffix={s.suffix}/>
                      </div>
                      <div className="font-dm text-xs" style={{color:"var(--text-faint)"}}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      {(experiences || []).length>0 && (
        <section className="section-pad bg-alt">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-14">
              <p className="text-xs font-dm uppercase tracking-widest mb-3" style={{color:"var(--gold)"}}>المسيرة المهنية</p>
              <h2 className="display-md" style={{color:"var(--text)"}}>الخبرة العملية</h2>
            </motion.div>
            <div className="relative">
              <div className="absolute right-0 top-0 bottom-0 w-px md:right-auto md:left-[200px]"
                style={{background:"linear-gradient(to bottom,var(--gold),var(--gold-subtle),transparent)"}}/>
              <div className="space-y-10">
                {experiences.map((exp:any,i:number)=>(
                  <motion.div key={exp.id} initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}}
                    viewport={{once:true}} transition={{delay:i*.15,duration:.7}}
                    className="flex flex-col md:flex-row gap-6 md:gap-10">
                    <div className="md:w-48 flex-shrink-0 font-dm text-sm pt-1" style={{color:"var(--text-faint)"}}>{exp.period}</div>
                    <div className="hidden md:flex flex-shrink-0 items-start pt-2"><div className="glow-dot"/></div>
                    <div className="flex-1 glass rounded-xl p-6 glass-hover">
                      <h3 className="font-playfair text-xl mb-1" style={{color:"var(--text)"}}>{exp.role}</h3>
                      <div className="font-dm text-sm mb-3" style={{color:"var(--gold)"}}>{exp.company}</div>
                      <p className="font-dm text-sm leading-relaxed mb-4" style={{color:"var(--text-muted)"}}>{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(exp.tech||[]).map((t:string)=>(
                          <span key={t} className="text-xs font-dm px-3 py-1 rounded-full"
                            style={{color:"var(--text-muted)",background:"var(--bg-300)"}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills || []).length>0 && (
        <section className="section-pad">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
              <p className="text-xs font-dm uppercase tracking-widest mb-3" style={{color:"var(--gold)"}}>الأدوات والتقنيات</p>
              <h2 className="display-md" style={{color:"var(--text)"}}>ترسانة المهارات</h2>
            </motion.div>
            <div className="space-y-10">
              {skills.map((group:any)=>(
                <div key={group.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="glow-dot"/>
                    <h3 className="font-dm text-sm uppercase tracking-widest" style={{color:"var(--gold)"}}>{group.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(group.skills||[]).map((skill:any,i:number)=>(
                      <motion.div key={skill.id} initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}}
                        viewport={{once:true}} transition={{delay:i*.05}}
                        className="glass p-5 rounded-xl flex items-center justify-between group">
                        <span className="font-dm text-sm" style={{color:"var(--text)"}}>{skill.name}</span>
                        <span className="text-[10px] font-dm opacity-40 group-hover:opacity-100 transition-opacity" style={{color:"var(--gold)"}}>{skill.level}%</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
