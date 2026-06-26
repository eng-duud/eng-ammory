"use client";

import Link from "next/link";
import { siteData } from "../data";

const Icons = {
  Github: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  Mail: ({ size = 16 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  )
};

export default function Footer() {
  return (
    <footer className="relative border-t py-12" style={{ borderColor: "var(--glass-border)", background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Compact 2x2 Grid on Mobile, 4 columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-2">
            <div className="font-playfair text-xl font-bold gold-text">عمرو الجمل</div>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>مطور أنظمة ومواقع.</p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-2 text-left">
            <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--gold)" }}>روابط</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/" className="text-xs hover:text-[var(--gold)]" style={{ color: "var(--text-faint)" }}>الرئيسية</Link>
              <Link href="/works" className="text-xs hover:text-[var(--gold)]" style={{ color: "var(--text-faint)" }}>أعمالي</Link>
            </div>
          </div>

          {/* Col 3: Social */}
          <div className="flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--gold)" }}>تابعني</div>
            <div className="flex gap-3">
              <a href={siteData.social.github} target="_blank" className="text-[var(--text-faint)] hover:text-[var(--gold)]"><Icons.Github /></a>
              <a href={siteData.social.linkedin} target="_blank" className="text-[var(--text-faint)] hover:text-[var(--gold)]"><Icons.Linkedin /></a>
              <a href={`mailto:${siteData.email}`} className="text-[var(--text-faint)] hover:text-[var(--gold)]"><Icons.Mail /></a>
            </div>
          </div>

          {/* Col 4: Copyright */}
          <div className="flex flex-col gap-2 lg:items-end">
            <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>
              © {new Date().getFullYear()} جميع الحقوق محفوظة.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
