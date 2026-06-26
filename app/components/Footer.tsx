"use client";

import Link from "next/link";
<<<<<<< HEAD
import { Globe, Globe2, Mail, Heart } from "lucide-react";
=======
import { GitFork, Link2, MessageCircle, Mail, Heart } from "lucide-react";
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
import { siteData } from "../data";

export default function Footer() {
  return (
<<<<<<< HEAD
    <footer
      className="relative border-t"
      style={{ borderColor: "var(--glass-border)", background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="font-playfair text-2xl font-bold gold-text mb-3">عمرو الجمل</div>
            <p className="text-sm font-dm leading-relaxed mb-6" style={{ color: "var(--text-faint)" }}>
=======
    <footer className="relative border-t border-[#C9A96E]/10 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-playfair text-2xl font-bold gold-text mb-3">عمرو الجمل</div>
            <p className="text-[#555] text-sm font-dm leading-relaxed mb-6">
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
              مطور أنظمة ومواقع بدقة عالية.
              <br />أبني تجارب رقمية تترك أثراً.
            </p>
            <div className="flex gap-3">
              {[
<<<<<<< HEAD
                { icon: Globe,    href: siteData.social.github,              label: "GitHub"   },
                { icon: Globe2,   href: siteData.social.linkedin,            label: "LinkedIn" },
                { icon: Mail,     href: siteData.social.twitter,             label: "Twitter"  },
                { icon: Mail,  href: `mailto:${siteData.email}`,          label: "Email"    },
=======
                { icon: GitFork, href: siteData.social.github, label: "GitHub" },
                { icon: Link2, href: siteData.social.linkedin, label: "LinkedIn" },
                { icon: MessageCircle, href: siteData.social.twitter, label: "Twitter" },
                { icon: Mail, href: `mailto:${siteData.email}`, label: "Email" },
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
<<<<<<< HEAD
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-faint)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-faint)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                  }}
=======
                  className="w-9 h-9 rounded-lg border border-[#C9A96E]/20 flex items-center justify-center text-[#555] hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all duration-300"
                  aria-label={label}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          {/* Nav links */}
          <div>
            <div className="text-xs font-dm uppercase tracking-widest mb-5" style={{ color: "var(--gold)" }}>التنقل</div>
            <div className="flex flex-col gap-3">
              {[
                { href: "/",        label: "الرئيسية" },
                { href: "/about",   label: "عني"      },
                { href: "/works",   label: "أعمالي"   },
                { href: "/contact", label: "تواصل"    },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover-gold text-sm font-dm w-fit transition-colors duration-300"
                  style={{ color: "var(--text-faint)" }}
=======
          {/* Links */}
          <div>
            <div className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-5">التنقل</div>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/about", label: "عني" },
                { href: "/works", label: "أعمالي" },
                { href: "/contact", label: "تواصل" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#555] hover:text-[#C9A96E] text-sm font-dm transition-colors hover-gold w-fit"
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
<<<<<<< HEAD
            <div className="text-xs font-dm uppercase tracking-widest mb-5" style={{ color: "var(--gold)" }}>للتواصل</div>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${siteData.email}`}  className="text-sm font-dm transition-colors hover:text-[var(--gold)]" style={{ color: "var(--text-faint)" }}>{siteData.email}</a>
              <a href={`tel:${siteData.phone}`}     className="text-sm font-dm transition-colors hover:text-[var(--gold)]" style={{ color: "var(--text-faint)" }}>{siteData.phone}</a>
              <span className="text-sm font-dm" style={{ color: "var(--text-faint)" }}>{siteData.location}</span>
=======
            <div className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-5">للتواصل</div>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${siteData.email}`} className="text-[#555] hover:text-[#C9A96E] text-sm font-dm transition-colors">
                {siteData.email}
              </a>
              <a href={`tel:${siteData.phone}`} className="text-[#555] hover:text-[#C9A96E] text-sm font-dm transition-colors">
                {siteData.phone}
              </a>
              <span className="text-[#555] text-sm font-dm">{siteData.location}</span>
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--bg-300)" }}
        >
          <p className="text-xs font-dm" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} عمرو خالد الجمل — جميع الحقوق محفوظة
          </p>
          <p className="text-xs font-dm flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
            صُنع بـ <Heart size={11} style={{ color: "var(--gold)" }} fill="var(--gold)" /> وشغف حقيقي
=======
        {/* Bottom */}
        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#333] text-xs font-dm">
            © {new Date().getFullYear()} عمرو خالد الجمل — جميع الحقوق محفوظة
          </p>
          <p className="text-[#333] text-xs font-dm flex items-center gap-1.5">
            صُنع بـ <Heart size={11} className="text-[#C9A96E]" fill="#C9A96E" /> وشغف حقيقي
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
          </p>
        </div>
      </div>
    </footer>
  );
}
