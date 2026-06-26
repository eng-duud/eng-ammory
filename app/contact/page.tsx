"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [settings, setSettings] = useState<any>({});
  const [state, setState]       = useState<"idle"|"loading"|"success"|"error">("idle");
  const [form, setForm]         = useState({ name:"", email:"", subject:"", message:"" });
  const [errors, setErrors]     = useState<Record<string,string>>({});

  useEffect(()=>{ fetch("/api/settings").then(r=>r.json()).then(setSettings); },[]);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())    e.name    = "الاسم مطلوب";
    if (!form.email.trim())   e.email   = "البريد مطلوب";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "بريد غير صالح";
    if (!form.message.trim()) e.message = "الرسالة مطلوبة";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form)
      });
      if (res.ok) setState("success");
      else setState("error");
    } catch { setState("error"); }
  };

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <p className="text-xs font-dm uppercase tracking-widest mb-4" style={{color:"var(--gold)"}}>ابدأ الحوار</p>
            <h1 className="display-lg mb-6" style={{color:"var(--text)"}}>
              دعنا نبني شيئاً<br/><span className="gold-text">رائعاً معاً</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-2 space-y-4">
              {[
                {label:"البريد الإلكتروني", value:settings.email,    href:`mailto:${settings.email}`},
                {label:"الهاتف / واتساب",   value:settings.phone,    href:`tel:${settings.phone}`},
                {label:"الموقع",             value:settings.location, href:"#"},
              ].filter(x=>x.value).map(({label,value,href})=>(
                <a key={label} href={href} className="flex items-start gap-4 glass glass-hover rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{border:"1px solid var(--glass-border)",color:"var(--text-faint)"}}>
                    <span style={{color:"var(--gold)"}}>•</span>
                  </div>
                  <div>
                    <div className="font-dm text-xs mb-1" style={{color:"var(--text-faint)"}}>{label}</div>
                    <div className="font-dm text-sm" style={{color:"var(--text)"}}>{value}</div>
                  </div>
                </a>
              ))}
              <div className="glass rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="glow-dot"/>
                  <span className="font-dm text-sm font-medium" style={{color:"var(--gold)"}}>متاح الآن</span>
                </div>
                <p className="font-dm text-xs leading-relaxed" style={{color:"var(--text-faint)"}}>
                  أرد خلال 24 ساعة. للمشاريع العاجلة تواصل مباشرة.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-3">
              <div className="glass rounded-2xl p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {state==="success" ? (
                    <motion.div key="ok" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}
                      className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{border:"2px solid var(--gold)", color:"var(--gold)"}}>
                        <span className="text-3xl">✓</span>
                      </div>
                      <h3 className="font-playfair text-2xl mb-3" style={{color:"var(--text)"}}>تم الإرسال!</h3>
                      <p className="font-dm text-sm mb-8" style={{color:"var(--text-muted)"}}>شكراً لتواصلك. سأرد في أقرب وقت.</p>
                      <button onClick={()=>{setState("idle");setForm({name:"",email:"",subject:"",message:""}); }}
                        className="font-dm text-sm hover:underline" style={{color:"var(--gold)"}}>إرسال رسالة أخرى</button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}}>
                      <h2 className="font-playfair text-2xl mb-8" style={{color:"var(--text)"}}>أرسل رسالتك</h2>
                      {state==="error" && (
                        <div className="mb-4 p-3 rounded-lg text-sm font-dm" style={{background:"rgba(239,68,68,0.1)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.2)"}}>
                          حدث خطأ، يرجى المحاولة لاحقاً
                        </div>
                      )}
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {[
                            {id:"name",  type:"text",  placeholder:"اسمك الكريم",      label:"الاسم"},
                            {id:"email", type:"email", placeholder:"email@example.com", label:"البريد الإلكتروني"},
                          ].map(f=>(
                            <div key={f.id}>
                              <label className="block font-dm text-xs mb-2 uppercase tracking-wider" style={{color:"var(--text-faint)"}}>{f.label}</label>
                              <input type={f.type} placeholder={f.placeholder}
                                value={form[f.id as keyof typeof form]}
                                onChange={e=>setForm({...form,[f.id]:e.target.value})}
                                className={`input-gold ${errors[f.id]?"!border-red-500/50":""}`}/>
                              {errors[f.id] && <p className="text-red-400 text-xs font-dm mt-1">{errors[f.id]}</p>}
                            </div>
                          ))}
                        </div>
                        <div>
                          <label className="block font-dm text-xs mb-2 uppercase tracking-wider" style={{color:"var(--text-faint)"}}>الموضوع</label>
                          <input type="text" placeholder="موضوع رسالتك" value={form.subject}
                            onChange={e=>setForm({...form,subject:e.target.value})} className="input-gold"/>
                        </div>
                        <div>
                          <label className="block font-dm text-xs mb-2 uppercase tracking-wider" style={{color:"var(--text-faint)"}}>الرسالة</label>
                          <textarea rows={6} placeholder="اكتب رسالتك هنا..." value={form.message}
                            onChange={e=>setForm({...form,message:e.target.value})}
                            className={`input-gold resize-none ${errors.message?"!border-red-500/50":""}`}/>
                          {errors.message && <p className="text-red-400 text-xs font-dm mt-1">{errors.message}</p>}
                        </div>
                        <button onClick={handleSubmit} disabled={state==="loading"}
                          className="w-full py-4 font-dm font-semibold rounded-lg flex items-center justify-center gap-3 transition-all disabled:opacity-60"
                          style={{background:"var(--gold)",color:"var(--bg)"}}>
                          {state==="loading" ? (
                            <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                              style={{borderColor:"rgba(0,0,0,.3)",borderTopColor:"var(--bg)"}}/> جاري الإرسال...</>
                          ) : "إرسال الرسالة"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
