"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [editingId, setEditingId]     = useState<string|null>(null);
  const [showForm, setShowForm]       = useState(false);

  const [form, setForm] = useState({
    role:"", company:"", period:"", description:"", tech:[] as string[]
  });
  const [newTech, setNewTech] = useState("");

  const load = () => {
    fetch("/api/admin/experiences").then(r=>r.json()).then(d=>{
      setExperiences(Array.isArray(d)?d:[]);
      setLoading(false);
    });
  };
  useEffect(()=>load(),[]);

  const save = async () => {
    if(!form.role||!form.company||!form.period||!form.description) return;
    const method = editingId?"PUT":"POST";
    const url = editingId?`/api/admin/experiences/${editingId}`:"/api/admin/experiences";
    await fetch(url,{method,headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    resetForm();
    load();
  };

  const resetForm = () => {
    setForm({role:"",company:"",period:"",description:"",tech:[]});
    setNewTech("");
    setShowForm(false);
    setEditingId(null);
  };

  const edit = (exp:any) => {
    setForm({...exp});
    setEditingId(exp.id);
    setShowForm(true);
  };

  const del = async (id:string) => {
    if(!confirm("حذف هذه الخبرة؟")) return;
    await fetch(`/api/admin/experiences/${id}`,{method:"DELETE"});
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>الخبرات العملية</h1>
          <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>{experiences.length} خبرة</p>
        </div>
        {!showForm && (
          <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 font-dm text-sm font-medium rounded-lg"
            style={{background:"var(--gold)",color:"var(--bg)"}}>
            <Plus size={16}/> خبرة جديدة
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
        </div>
      ) : (
        <div className="space-y-6">
          {showForm && (
            <div className="glass rounded-2xl p-6">
              <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>{editingId?"تعديل الخبرة":"خبرة جديدة"}</h2>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>الوظيفة</label>
                    <input className="input-gold" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="مطور Full-Stack"/>
                  </div>
                  <div>
                    <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>الشركة</label>
                    <input className="input-gold" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="اسم الشركة"/>
                  </div>
                </div>
                <div>
                  <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>الفترة الزمنية</label>
                  <input className="input-gold" value={form.period} onChange={e=>setForm({...form,period:e.target.value})} placeholder="2023 - 2024"/>
                </div>
                <div>
                  <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>الوصف</label>
                  <textarea rows={3} className="input-gold resize-none" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="وصف الخبرة..."/>
                </div>
                <div>
                  <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>التقنيات</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.tech.map(t=>(
                      <span key={t} className="flex items-center gap-1.5 font-dm text-xs px-2.5 py-1 rounded-full"
                        style={{background:"var(--gold-subtle)",color:"var(--gold)",border:"1px solid var(--glass-border)"}}>
                        {t}
                        <button onClick={()=>setForm({...form,tech:form.tech.filter(x=>x!==t)})}>
                          <X size={10}/>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input className="input-gold flex-1" value={newTech} placeholder="إضافة تقنية" onChange={e=>setNewTech(e.target.value)}
                      onKeyDown={e=>{if(e.key==="Enter"&&newTech.trim()){setForm({...form,tech:[...form.tech,newTech]});setNewTech("");}}}/>
                    <button onClick={()=>{if(newTech.trim()){setForm({...form,tech:[...form.tech,newTech]});setNewTech("");}}} className="px-4 py-2 font-dm text-sm rounded-lg"
                      style={{background:"var(--gold)",color:"var(--bg)"}}>
                      <Plus size={14}/>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={save} className="flex-1 py-2.5 px-4 font-dm font-semibold rounded-lg"
                  style={{background:"var(--gold)",color:"var(--bg)"}}>
                  حفظ الخبرة
                </button>
                <button onClick={resetForm} className="px-6 py-2.5 font-dm rounded-lg"
                  style={{border:"1px solid var(--glass-border)",color:"var(--text-muted)"}}>
                  إلغاء
                </button>
              </div>
            </div>
          )}

          {experiences.map(exp=>(
            <div key={exp.id} className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-playfair text-lg" style={{color:"var(--text)"}}>{exp.role}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-dm text-sm" style={{color:"var(--gold)"}}>{exp.company}</span>
                    <span className="font-dm text-sm" style={{color:"var(--text-faint)"}}>{exp.period}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>edit(exp)} className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{background:"var(--bg-200)",color:"var(--text-faint)"}}>
                    <Pencil size={14}/>
                  </button>
                  <button onClick={()=>del(exp.id)} className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{background:"rgba(239,68,68,0.1)",color:"#ef4444"}}>
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
              <p className="font-dm text-sm leading-relaxed mb-4" style={{color:"var(--text-muted)"}}>{exp.description}</p>
              {exp.tech?.length>0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t:string)=>(
                    <span key={t} className="text-xs font-dm px-2 py-1 rounded-full"
                      style={{color:"var(--text-muted)",background:"var(--bg-300)"}}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {experiences.length===0 && !showForm && (
            <div className="text-center py-20">
              <p className="font-dm" style={{color:"var(--text-faint)"}}>لا توجد خبرات بعد</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
