"use client";
import { useEffect, useState } from "react";
import { FolderOpen, MessageSquare, EyeOff, Star } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [projects, setProjects]   = useState<any[]>([]);
  const [messages, setMessages]   = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/projects").then(r=>r.json()).then(d=>Array.isArray(d)?setProjects(d):[]);
    fetch("/api/admin/messages").then(r=>r.json()).then(d=>Array.isArray(d)?setMessages(d):[]);
  }, []);

  const unread   = messages.filter(m=>!m.read).length;
  const featured = projects.filter(p=>p.featured).length;
  const hidden   = projects.filter(p=>p.hidden).length;

  const statCards = [
    { label:"إجمالي المشاريع", value:projects.length, icon:FolderOpen,    href:"/studio-x7k/projects", color:"#C9A96E" },
    { label:"الرسائل الجديدة", value:unread,          icon:MessageSquare, href:"/studio-x7k/messages", color:"#4a9eff" },
    { label:"مشاريع مميزة",    value:featured,        icon:Star,          href:"/studio-x7k/projects", color:"#2ecc71" },
    { label:"مشاريع مخفية",    value:hidden,          icon:EyeOff,        href:"/studio-x7k/projects", color:"#e74c3c" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>أهلاً بك 👋</h1>
        <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>نظرة عامة على محتوى الموقع</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
        {statCards.map(({label,value,icon:Icon,href,color})=>(
          <Link key={label} href={href}
            className="glass glass-hover rounded-2xl p-6 flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{background:`${color}20`,border:`1px solid ${color}40`}}>
              <Icon size={20} style={{color}}/>
            </div>
            <div>
              <div className="font-playfair text-3xl font-bold mb-1" style={{color:"var(--text)"}}>{value}</div>
              <div className="font-dm text-xs" style={{color:"var(--text-faint)"}}>{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl" style={{color:"var(--text)"}}>آخر الرسائل</h2>
            <Link href="/studio-x7k/messages" className="font-dm text-xs" style={{color:"var(--gold)"}}>عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {messages.slice(0,5).map(m=>(
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl" style={{background:"var(--bg-200)"}}>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{background:m.read?"var(--text-faint)":"var(--gold)"}}/>
                <div className="flex-1 min-w-0">
                  <div className="font-dm text-sm font-medium truncate" style={{color:"var(--text)"}}>{m.name}</div>
                  <div className="font-dm text-xs truncate" style={{color:"var(--text-faint)"}}>{m.message}</div>
                </div>
              </div>
            ))}
            {messages.length===0 && <p className="font-dm text-sm text-center py-4" style={{color:"var(--text-faint)"}}>لا توجد رسائل</p>}
          </div>
        </div>

        {/* Recent projects */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl" style={{color:"var(--text)"}}>آخر المشاريع</h2>
            <Link href="/studio-x7k/projects" className="font-dm text-xs" style={{color:"var(--gold)"}}>عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0,5).map(p=>(
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--bg-200)"}}>
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{background:p.hidden?"var(--text-faint)":p.featured?"#C9A96E":"var(--gold)"}}/>
                <div className="flex-1 min-w-0">
                  <div className="font-dm text-sm truncate" style={{color:"var(--text)"}}>{p.title}</div>
                </div>
                <div className="flex items-center gap-1">
                  {p.featured && <Star size={12} style={{color:"#C9A96E"}}/>}
                  {p.hidden   && <EyeOff size={12} style={{color:"var(--text-faint)"}}/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
