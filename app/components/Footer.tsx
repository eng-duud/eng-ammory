"use client";

import Link from "next/link";
import { Globe, Globe2, Mail, Heart } from "lucide-react";
import { siteData } from "../data";

export default function Footer() {
  return (
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
              مطور أنظمة ومواقع بدقة عالية.
              <br />أبني تجارب رقمية تترك أثراً.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe,    href: siteData.social.github,              label: "GitHub"   },
                { icon: Globe2,   href: siteData.social.linkedin,            label: "LinkedIn" },
                { icon: Mail,     href: siteData.social.twitter,             label: "Twitter"  },
                { icon: Mail,     href: `mailto:${siteData.email}`,          label: "Email"    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

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
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-dm uppercase tracking-widest mb-5" style={{ color: "var(--gold)" }}>للتواصل</div>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${siteData.email}`}  className="text-sm font-dm transition-colors hover:text-[var(--gold)]" style={{ color: "var(--text-faint)" }}>{siteData.email}</a>
              <a href={`tel:${siteData.phone}`}     className="text-sm font-dm transition-colors hover:text-[var(--gold)]" style={{ color: "var(--text-faint)" }}>{siteData.phone}</a>
              <span className="text-sm font-dm" style={{ color: "var(--text-faint)" }}>{siteData.location}</span>
            </div>
          </div>
        </div>

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
          </p>
        </div>
      </div>
    </footer>
  );
}
