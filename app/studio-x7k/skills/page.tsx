"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function AdminSkills() {
  const [groups, setGroups]   = useState<any[]>([]);
  const [skills, setSkills]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string|null>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [selectedGroup, setSelectedGroup] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/skills");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const d = await res.json();
      setGroups(d.groups || []);
      setSkills(d.skills || []);
    } catch (err: any) {
      console.error("Load Skills Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addSkill = async () => {
    if(!newSkillName||!selectedGroup) return;
    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSkillName, level: newSkillLevel, groupId: selectedGroup })
      });
      if (!res.ok) throw new Error("Failed to add skill");
      setNewSkillName("");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const updateSkill = async () => {
    if(!editingSkill) return;
    try {
      const res = await fetch(`/api/admin/skills/${editingSkill.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSkill)
      });
      if (!res.ok) throw new Error("Failed to update skill");
      setEditingSkill(null);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const delSkill = async (id:string) => {
    if(!confirm("حذف هذه المهارة؟")) return;
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>المهارات</h1>
        <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>{skills.length} مهارة</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">خطأ في جلب المهارات: {error}</p>
          <button onClick={load} className="text-sm font-dm underline" style={{color:"var(--gold)"}}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Add new skill */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-playfair text-xl mb-5" style={{color:"var(--text)"}}>إضافة مهارة جديدة</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>اسم المهارة</label>
                <input className="input-gold" value={newSkillName} onChange={e=>setNewSkillName(e.target.value)} placeholder="React"/>
              </div>
              <div>
                <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>مستوى الإتقان</label>
                <input type="number" min="0" max="100" className="input-gold" value={newSkillLevel} onChange={e=>setNewSkillLevel(+e.target.value)}/>
              </div>
              <div>
                <label className="block font-dm text-xs mb-2 uppercase" style={{color:"var(--text-faint)"}}>المجموعة</label>
                <select className="input-gold" value={selectedGroup} onChange={e=>setSelectedGroup(e.target.value)}
                  style={{background:"var(--glass-bg)",color:"var(--text)"}}>
                  <option value="">اختر المجموعة</option>
                  {groups.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={addSkill} className="w-full py-2.5 px-4 font-dm text-sm font-medium rounded-lg flex items-center justify-center gap-2"
                  style={{background:"var(--gold)",color:"var(--bg)"}}>
                  <Plus size={14}/> إضافة
                </button>
              </div>
            </div>
          </div>

          {/* Skills by group */}
          {groups.map(g=>(
            <div key={g.id} className="glass rounded-2xl p-6">
              <h3 className="font-playfair text-lg mb-4" style={{color:"var(--text)"}}>{g.name}</h3>
              <div className="space-y-3">
                {skills.filter(s=>s.groupId===g.id).map(s=>(
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg" style={{background:"var(--bg-200)"}}>
                    {editingSkill?.id===s.id ? (
                      <>
                        <input className="input-gold flex-1" value={editingSkill.name} onChange={e=>setEditingSkill({...editingSkill,name:e.target.value})} placeholder="اسم المهارة"/>
                        <input type="number" min="0" max="100" className="input-gold w-24" value={editingSkill.level} onChange={e=>setEditingSkill({...editingSkill,level:+e.target.value})}/>
                        <button onClick={updateSkill} className="px-3 py-1.5 text-sm font-dm rounded" style={{background:"var(--gold)",color:"var(--bg)"}}>حفظ</button>
                        <button onClick={()=>setEditingSkill(null)} className="px-3 py-1.5 text-sm font-dm rounded" style={{border:"1px solid var(--glass-border)",color:"var(--text-muted)"}}>إلغاء</button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="font-dm text-sm mb-1" style={{color:"var(--text)"}}>{s.name}</div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{background:"var(--bg-300)"}}>
                            <div className="h-full rounded-full transition-all" style={{background:"var(--gold)",width:`${s.level}%`}}/>
                          </div>
                        </div>
                        <div className="font-dm text-xs font-medium" style={{color:"var(--gold)",minWidth:"40px",textAlign:"right"}}>{s.level}%</div>
                        <button onClick={()=>setEditingSkill(s)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"var(--bg-300)",color:"var(--text-faint)"}}>
                          <Pencil size={14}/>
                        </button>
                        <button onClick={()=>delSkill(s.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"rgba(239,68,68,0.1)",color:"#ef4444"}}>
                          <Trash2 size={14}/>
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
