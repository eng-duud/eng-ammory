"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Globe, ChevronLeft, Github } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.id as string;
    fetch(`/api/projects/${slug}`).then(r=>r.json()).then(p=>{
      setProject(p);
      setLoading(false);
      fetch("/api/projects").then(r=>r.json()).then((all:any[])=>{
        setRelated(all.filter(x=>x.slug!==slug).slice(0,3));
      });
    }).catch(()=>setLoading(false));
  },[params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
    </div>
  );

  if (!project || project.error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="display-md mb-4" style={{color:"var(--text-faint)"}}>404</div>
        <Link href="/works" style={{color:"var(--gold)"}} className="font-dm hover:underline">العودة للأعمال</Link>
      </div>
    </div>
  );

  const techList: string[] = (project.tech||[]).map((t:any)=>typeof t==="string"?t:t.name);
  const images: any[]      = project.images || [];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{background:`radial-gradient(ellipse at top right,${project.color}50 0%,transparent 60%)`}}/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="flex items-center gap-2 text-sm font-dm mb-10" style={{color:"var(--text-faint)"}}>
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">الرئيسية</Link>
            <ChevronLeft size={14}/>
            <Link href="/works" className="hover:text-[var(--gold)] transition-colors">الأعمال</Link>
            <ChevronLeft size={14}/>
            <span style={{color:"var(--gold)"}}>{project.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
              <div className="flex items-center gap-3 mb-6">
	                <span className="text-xs font-dm uppercase tracking-widest border px-3 py-1 rounded-full"
	                  style={{color:"var(--gold)",borderColor:"var(--glass-border)"}}>{project.category?.name || project.category_name}</span>
	                {project.year && <span className="text-xs font-dm" style={{color:"var(--text-faint)"}}>{project.year}</span>}
	              </div>
	              <h1 className="display-lg mb-6" style={{color:"var(--text)"}}>{project.title}</h1>
	              <p className="font-dm leading-relaxed text-lg mb-8" style={{color:"var(--text-muted)"}}>
	                {project.descriptionLong || project.description_long || project.description}
	              </p>
	              <div className="flex flex-wrap gap-3">
		                {(project?.liveUrl || project?.live_url) && (project.liveUrl || project.live_url) !== "#" && (
		                  <a href={project.liveUrl || project.live_url} target="_blank" rel="noopener noreferrer"
		                    className="flex items-center gap-2 px-6 py-3 font-dm font-semibold rounded-lg transition-all"
		                    style={{background:"var(--gold)",color:"var(--bg)"}}>
		                    <ExternalLink size={15}/> المشروع الحي
		                  </a>
		                )}
		                {(project?.githubUrl || project?.github_url) && (project.githubUrl || project.github_url) !== "#" && (
		                  <a href={project.githubUrl || project.github_url} target="_blank" rel="noopener noreferrer"
		                    className="flex items-center gap-2 px-6 py-3 font-dm rounded-lg transition-all"
		                    style={{border:"1px solid var(--glass-border)",color:"var(--gold)"}}>
		                    <Github size={15}/> الكود المصدري
		                  </a>
		                )}
	              </div>
            </motion.div>

            <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1}}>
              <div className="aspect-video rounded-2xl relative overflow-hidden border"
                style={{background:`linear-gradient(135deg,${project.color} 0%,var(--bg) 100%)`,borderColor:"var(--bg-300)"}}>
	                {(project.coverImage || project.cover_image) ? (
	                  <img src={project.coverImage || project.cover_image} alt={project.title} className="w-full h-full object-cover"/>
	                ) : (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 gap-2"
                      style={{background:"rgba(0,0,0,0.4)"}}>
                      {["#ff5f57","#febc2e","#28c840"].map(c=>(
                        <div key={c} className="w-3 h-3 rounded-full" style={{background:c}}/>
                      ))}
                    </div>
                    <div className="absolute inset-0 top-8 p-6 opacity-30">
                      <div className="h-4 rounded-full w-1/2 mb-3" style={{background:"rgba(255,255,255,0.3)"}}/>
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {[...Array(6)].map((_,j)=>(
                          <div key={j} className="h-14 rounded-lg" style={{background:project.accent+"44"}}/>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {techList.length>0 && (
        <section className="py-16" style={{borderTop:"1px solid var(--bg-300)",borderBottom:"1px solid var(--bg-300)"}}>
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-6" style={{color:"var(--gold)"}}>التقنيات المستخدمة</p>
            <div className="flex flex-wrap gap-3">
              {techList.map((tech:string,i:number)=>(
                <motion.span key={tech} initial={{opacity:0,scale:.8}} whileInView={{opacity:1,scale:1}}
                  viewport={{once:true}} transition={{delay:i*.05}}
                  className="font-dm text-sm px-5 py-2.5 rounded-full border transition-all duration-300 cursor-default"
                  style={{color:"var(--text)",background:"var(--bg-200)",borderColor:"var(--bg-400)"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--gold)";(e.currentTarget as HTMLElement).style.color="var(--gold)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--bg-400)";(e.currentTarget as HTMLElement).style.color="var(--text)";}}>
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {images.length>0 && (
        <section className="section-pad">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>معرض الصور</p>
            <h2 className="display-md mb-10" style={{color:"var(--text)"}}>لقطات من المشروع</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((img:any,i:number)=>(
                <motion.div key={img.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*.1}}
                  className={`rounded-xl overflow-hidden border ${i===0?"md:col-span-2 aspect-video":"aspect-square"}`}
                  style={{borderColor:"var(--bg-300)"}}>
                  <img src={img.url} alt={img.alt||project.title} className="w-full h-full object-cover"/>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length>0 && (
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-dm uppercase tracking-widest mb-10" style={{color:"var(--text-faint)"}}>مشاريع ذات صلة</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p:any)=>(
                <Link key={p.id} href={`/works/${p.slug}`} className="group">
                  <div className="glass rounded-2xl overflow-hidden border transition-all duration-500 glass-hover"
                    style={{borderColor:"var(--bg-300)"}}>
	                    <div className="h-40 relative overflow-hidden" style={{background:`linear-gradient(135deg,${p.color} 0%,var(--bg) 100%)`}}>
	                      {(p.coverImage || p.cover_image) && <img src={p.coverImage || p.cover_image} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"/>}
	                    </div>
	                    <div className="p-5">
	                      <h4 className="font-playfair text-lg" style={{color:"var(--text)"}}>{p.title}</h4>
	                      <p className="text-xs font-dm mt-1" style={{color:"var(--text-faint)"}}>{p.category?.name || p.category_name}</p>
	                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
