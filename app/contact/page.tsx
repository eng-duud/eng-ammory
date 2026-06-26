"use client";
<<<<<<< HEAD
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { useEffect } from "react";

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
=======

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, GitFork, Link2 } from "lucide-react";
import { siteData } from "../data";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.email.trim()) errs.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "بريد إلكتروني غير صالح";
    if (!form.message.trim()) errs.message = "الرسالة مطلوبة";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 2000));
    setFormState("success");
  };

  const inputClass = (field: string) =>
    `input-gold ${errors[field] ? "border-red-500/50" : ""}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-4">ابدأ الحوار</p>
            <h1 className="display-lg text-white mb-6">
              دعنا نبني شيئاً
              <br />
              <span className="gold-text">رائعاً معاً</span>
            </h1>
            <p className="text-[#555] font-dm max-w-xl leading-relaxed">
              سواء كان لديك مشروع ضخم أو فكرة بسيطة، أنا هنا للاستماع والمساعدة. لا تتردد في التواصل.
            </p>
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
<<<<<<< HEAD
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-2 space-y-4">
              {[
                {icon:Mail,  label:"البريد الإلكتروني", value:settings.email,    href:`mailto:${settings.email}`},
                {icon:Phone, label:"الهاتف / واتساب",   value:settings.phone,    href:`tel:${settings.phone}`},
                {icon:MapPin,label:"الموقع",             value:settings.location, href:"#"},
              ].filter(x=>x.value).map(({icon:Icon,label,value,href})=>(
                <a key={label} href={href} className="flex items-start gap-4 glass glass-hover rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{border:"1px solid var(--glass-border)",color:"var(--text-faint)"}}>
                    <Icon size={16}/>
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
=======
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Info cards */}
              {[
                { icon: Mail, label: "البريد الإلكتروني", value: siteData.email, href: `mailto:${siteData.email}` },
                { icon: Phone, label: "الهاتف / واتساب", value: siteData.phone, href: `tel:${siteData.phone}` },
                { icon: MapPin, label: "الموقع", value: siteData.location, href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 glass glass-hover rounded-xl p-5 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 text-[#C9A96E]/60 group-hover:text-[#C9A96E] group-hover:border-[#C9A96E]/40 transition-all">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[#444] font-dm text-xs mb-1">{label}</div>
                    <div className="text-white font-dm text-sm">{value}</div>
                  </div>
                </a>
              ))}

              {/* Social */}
              <div className="glass rounded-xl p-5">
                <div className="text-[#444] font-dm text-xs mb-4 uppercase tracking-widest">التواصل الاجتماعي</div>
                <div className="flex gap-3">
                  {[
                    { icon: GitFork, href: siteData.social.github, label: "GitHub" },
                    { icon: Link2, href: siteData.social.linkedin, label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border border-[#C9A96E]/20 flex items-center justify-center text-[#555] hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all"
                      aria-label={label}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="glass rounded-xl p-5 border border-[#C9A96E]/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="glow-dot" />
                  <span className="text-[#C9A96E] font-dm text-sm font-medium">متاح الآن</span>
                </div>
                <p className="text-[#444] font-dm text-xs leading-relaxed">
                  أرد خلال 24 ساعة عادةً. للمشاريع العاجلة، تواصل عبر واتساب مباشرة.
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                </p>
              </div>
            </motion.div>

<<<<<<< HEAD
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-3">
              <div className="glass rounded-2xl p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {state==="success" ? (
                    <motion.div key="ok" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}
                      className="flex flex-col items-center justify-center py-16 text-center">
                      <motion.div initial={{scale:0}} animate={{scale:1}}
                        transition={{type:"spring",stiffness:200,damping:15,delay:.15}}>
                        <CheckCircle size={64} style={{color:"var(--gold)"}} className="mb-6"/>
                      </motion.div>
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
                          ) : <><Send size={16}/> إرسال الرسالة</>}
=======
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      >
                        <CheckCircle size={60} className="text-[#C9A96E] mb-6" />
                      </motion.div>
                      <h3 className="font-playfair text-2xl text-white mb-3">تم إرسال رسالتك!</h3>
                      <p className="text-[#555] font-dm text-sm mb-8">
                        شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.
                      </p>
                      <button
                        onClick={() => { setFormState("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                        className="text-[#C9A96E] font-dm text-sm hover:underline"
                      >
                        إرسال رسالة أخرى
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h2 className="font-playfair text-2xl text-white mb-8">أرسل رسالتك</h2>

                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[#444] font-dm text-xs mb-2 uppercase tracking-wider">الاسم</label>
                            <input
                              type="text"
                              placeholder="اسمك الكريم"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className={inputClass("name")}
                            />
                            {errors.name && <p className="text-red-400 text-xs font-dm mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-[#444] font-dm text-xs mb-2 uppercase tracking-wider">البريد الإلكتروني</label>
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className={inputClass("email")}
                            />
                            {errors.email && <p className="text-red-400 text-xs font-dm mt-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#444] font-dm text-xs mb-2 uppercase tracking-wider">الموضوع</label>
                          <input
                            type="text"
                            placeholder="موضوع رسالتك"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="input-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-[#444] font-dm text-xs mb-2 uppercase tracking-wider">الرسالة</label>
                          <textarea
                            rows={6}
                            placeholder="اكتب رسالتك هنا... أخبرني عن مشروعك وما تحتاجه."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className={`${inputClass("message")} resize-none`}
                          />
                          {errors.message && <p className="text-red-400 text-xs font-dm mt-1">{errors.message}</p>}
                        </div>

                        <button
                          onClick={handleSubmit}
                          disabled={formState === "loading"}
                          className="w-full py-4 bg-[#C9A96E] text-[#0D0D0D] font-dm font-semibold rounded-lg hover:bg-[#E2C898] disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.3)] flex items-center justify-center gap-3"
                        >
                          {formState === "loading" ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#0D0D0D]/30 border-t-[#0D0D0D] rounded-full animate-spin" />
                              جاري الإرسال...
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              إرسال الرسالة
                            </>
                          )}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
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
