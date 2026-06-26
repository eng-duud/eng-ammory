"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FolderOpen, Plus, Wrench, MessageSquare, Settings, LogOut, ChevronRight } from "lucide-react";

const links = [
  { href:"/studio-x7k",              label:"الرئيسية",  icon:LayoutDashboard },
  { href:"/studio-x7k/projects",     label:"المشاريع",  icon:FolderOpen      },
  { href:"/studio-x7k/projects/new", label:"إضافة مشروع", icon:Plus          },
  { href:"/studio-x7k/skills",       label:"المهارات",  icon:Wrench          },
  { href:"/studio-x7k/messages",     label:"الرسائل",   icon:MessageSquare   },
  { href:"/studio-x7k/settings",     label:"الإعدادات", icon:Settings        },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col glass border-l"
      style={{borderColor:"var(--glass-border)",minHeight:"100vh"}}>
      <div className="p-6 border-b" style={{borderColor:"var(--glass-border)"}}>
        <div className="font-playfair text-lg" style={{color:"var(--text)"}}>لوحة التحكم</div>
        <div className="font-dm text-xs mt-0.5" style={{color:"var(--text-faint)"}}>studio-x7k</div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({href,label,icon:Icon})=>{
          const active = pathname===href||(href!=="/studio-x7k"&&pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-dm text-sm transition-all"
              style={{
                background: active?"var(--gold-subtle)":"transparent",
                color:      active?"var(--gold)":"var(--text-muted)",
                borderLeft: active?"2px solid var(--gold)":"2px solid transparent",
              }}>
              <Icon size={16}/> {label}
              {active && <ChevronRight size={14} className="mr-auto" style={{color:"var(--gold)"}}/>}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t" style={{borderColor:"var(--glass-border)"}}>
        <button onClick={()=>signOut({callbackUrl:"/studio-x7k/login"})}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-dm text-sm transition-all"
          style={{color:"var(--text-faint)"}}>
          <LogOut size={16}/> تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
