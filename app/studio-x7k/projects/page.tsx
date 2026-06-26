"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, GripVertical } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string|null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const d = await res.json();
      setProjects(Array.isArray(d) ? d : []);
    } catch (err: any) {
      console.error("Load Projects Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id:string, field:"hidden"|"featured", val:boolean) => {
    const proj = projects.find(p=>p.id===id);
    if (!proj) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...proj,
          tech: (proj.tech || []).map((t: any) => typeof t === "string" ? t : t.name),
          [field]: val
        })
      });
      if (!res.ok) throw new Error("Failed to update");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const del = async (id:string) => {
    if (!confirm("حذف هذا المشروع نهائياً؟")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>المشاريع</h1>
          <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>{projects.length} مشروع</p>
        </div>
        <Link href="/studio-x7k/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 font-dm text-sm font-medium rounded-lg transition-all"
          style={{background:"var(--gold)",color:"var(--bg)"}}>
          <Plus size={16}/> مشروع جديد
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">خطأ في جلب البيانات: {error}</p>
          <button onClick={load} className="text-sm font-dm underline" style={{color:"var(--gold)"}}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(p=>(
            <div key={p.id} className="glass rounded-xl p-5 flex items-center gap-4">
              <GripVertical size={16} style={{color:"var(--text-faint)"}} className="cursor-grab flex-shrink-0"/>

              <div className="w-10 h-10 rounded-lg flex-shrink-0 relative overflow-hidden"
                style={{background:`linear-gradient(135deg,${p.color},${p.accent})`}}>
                {p.coverImage && <img src={p.coverImage} alt="" className="w-full h-full object-cover absolute inset-0"/>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-dm text-sm font-medium" style={{color:"var(--text)"}}>{p.title}</span>
                  {p.featured && <Star size={12} style={{color:"var(--gold)"}} fill="var(--gold)"/>}
                  {p.hidden   && <span className="text-xs font-dm px-2 py-0.5 rounded-full" style={{background:"var(--bg-300)",color:"var(--text-faint)"}}>مخفي</span>}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-dm text-xs" style={{color:"var(--text-faint)"}}>{p.category?.name}</span>
                  {p.year && <span className="font-dm text-xs" style={{color:"var(--text-faint)"}}>{p.year}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={()=>toggle(p.id,"featured",!p.featured)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{background:"var(--bg-200)",color:p.featured?"var(--gold)":"var(--text-faint)"}}>
                  <Star size={14} fill={p.featured?"var(--gold)":"none"}/>
                </button>
                <button onClick={()=>toggle(p.id,"hidden",!p.hidden)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{background:"var(--bg-200)",color:"var(--text-faint)"}}>
                  {p.hidden ? <Eye size={14}/> : <EyeOff size={14}/>}
                </button>
                <Link href={`/studio-x7k/projects/${p.id}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{background:"var(--bg-200)",color:"var(--text-faint)"}}>
                  <Pencil size={14}/>
                </Link>
                <button onClick={()=>del(p.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{background:"rgba(239,68,68,0.1)",color:"#ef4444"}}>
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          ))}
          {projects.length===0 && (
            <div className="text-center py-20">
              <p className="font-dm" style={{color:"var(--text-faint)"}}>لا توجد مشاريع بعد</p>
              <Link href="/studio-x7k/projects/new" className="inline-flex items-center gap-2 mt-4 font-dm text-sm" style={{color:"var(--gold)"}}>
                <Plus size={14}/> أضف أول مشروع
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
