"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/",        label: "الرئيسية" },
  { href: "/about",   label: "عني"      },
  { href: "/works",   label: "أعمالي"   },
  { href: "/contact", label: "تواصل"    },
];

/* ── Animated sun / moon toggle ───────────────────────────────── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
      className="relative w-[52px] h-[28px] rounded-full border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg,#1a1a1a,#0d0d0d)"
          : "linear-gradient(135deg,#e8e0d0,#d4c9b8)",
        borderColor: isDark
          ? "rgba(201,169,110,0.35)"
          : "rgba(140,106,50,0.35)",
        boxShadow: isDark
          ? "0 0 12px rgba(201,169,110,0.15)"
          : "0 0 12px rgba(140,106,50,0.15)",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="absolute inset-[3px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at 40% 40%, #C9A96E 0%, #A07840 100%)"
            : "radial-gradient(circle at 60% 40%, #f5d98b 0%, #e8c55a 100%)",
        }}
        animate={{ width: "22px", x: isDark ? 0 : 24 }}
        initial={false}
      />
      <span className="absolute left-[5px] top-1/2 -translate-y-1/2 pointer-events-none">
        <Moon
          size={12}
          className="transition-all duration-300"
          style={{ color: isDark ? "#0d0d0d" : "#b0a088", opacity: isDark ? 1 : 0 }}
        />
      </span>
      <span className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none">
        <Sun
          size={12}
          className="transition-all duration-300"
          style={{ color: isDark ? "#c9a96e" : "#8C6A32", opacity: isDark ? 0 : 1 }}
        />
      </span>
    </button>
  );
}

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const pathname = usePathname();
  const { theme }  = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(d => {
        if (d?.profileImage) setProfileImage(d.profileImage);
      });
  }, []);

  const headerBg = scrolled
    ? isDark
      ? "rgba(13,13,13,0.88)"
      : "rgba(240,237,232,0.88)"
    : "transparent";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: headerBg }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl
          ${scrolled ? "border-b py-4" : "py-6"}
        `}
      >
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "var(--glass-border)" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{ border: "1px solid var(--glass-border)" }}
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, var(--gold-subtle), transparent)" }}
                  />
                  <span
                    className="font-playfair font-bold text-lg relative z-10"
                    style={{ color: "var(--gold)" }}
                  >ع</span>
                </>
              )}
            </div>
            <div>
              <div
                className="font-playfair font-semibold text-sm leading-tight transition-colors duration-300"
                style={{ color: "var(--text)" }}
              >عمرو الجمل</div>
              <div className="text-xs font-dm" style={{ color: "var(--gold)" }}>Developer</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-dm transition-all duration-300"
                style={{ color: pathname === link.href ? "var(--gold)" : "var(--text-muted)" }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-bar"
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,var(--gold),transparent)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="relative px-6 py-2.5 text-sm font-dm font-medium rounded-lg overflow-hidden group transition-all duration-300"
              style={{ border: "1px solid var(--glass-border)", color: "var(--gold)" }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                style={{ background: "var(--gold-subtle)" }}
              />
              <span className="relative">للتواصل</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
              style={{ border: "1px solid var(--glass-border)", color: "var(--gold)" }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-2xl"
            style={{ background: isDark ? "rgba(13,13,13,0.96)" : "rgba(240,237,232,0.96)" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ border: "1px solid var(--glass-border)", color: "var(--gold)" }}
            >
              <X size={18} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-playfair text-4xl font-bold transition-colors"
                    style={{ color: pathname === link.href ? "var(--gold)" : "var(--text)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
