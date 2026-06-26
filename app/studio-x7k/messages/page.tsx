"use client";
import { useEffect, useState } from "react";
import { Mail, Trash2, Eye, EyeOff } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string|null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const d = await res.json();
      setMessages(Array.isArray(d) ? d : []);
    } catch (err: any) {
      console.error("Load Messages Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleRead = async (id:string, read:boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read })
      });
      if (!res.ok) throw new Error("Failed to update");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const del = async (id:string) => {
    if(!confirm("حذف هذه الرسالة؟")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const unread = messages.filter(m=>!m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>الرسائل</h1>
          <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>{unread} رسالة جديدة</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">خطأ في جلب الرسائل: {error}</p>
          <button onClick={load} className="text-sm font-dm underline" style={{color:"var(--gold)"}}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(m=>(
            <div key={m.id} className={`glass rounded-xl p-5 ${!m.read?"border-l-4":" border-l-4 border-transparent"}`}
              style={{borderLeftColor:!m.read?"var(--gold)":"transparent"}}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{background:"var(--gold-subtle)",color:"var(--gold)"}}>
                  <Mail size={16}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-dm font-medium" style={{color:"var(--text)"}}>{m.name}</h3>
                    <a href={`mailto:${m.email}`} className="text-xs font-dm" style={{color:"var(--text-faint)"}}>{m.email}</a>
                  </div>
                  {m.subject && <div className="font-dm text-sm mb-2" style={{color:"var(--text)"}}>{m.subject}</div>}
                  <p className="font-dm text-sm leading-relaxed mb-3" style={{color:"var(--text-muted)"}}>{m.message}</p>
                  <div className="font-dm text-xs" style={{color:"var(--text-faint)"}}>{new Date(m.created_at).toLocaleDateString("ar-SA")}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={()=>toggleRead(m.id,m.read)} title={m.read?"وضع علامة غير مقروء":"وضع علامة مقروء"}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{background:"var(--bg-200)",color:m.read?"var(--text-faint)":"var(--gold)"}}>
                    {m.read ? <Eye size={14}/> : <EyeOff size={14}/>}
                  </button>
                  <button onClick={()=>del(m.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{background:"rgba(239,68,68,0.1)",color:"#ef4444"}}>
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {messages.length===0 && (
            <div className="text-center py-20">
              <p className="font-dm" style={{color:"var(--text-faint)"}}>لا توجد رسائل بعد</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
