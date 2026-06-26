"use client";

import { useState, useEffect, useCallback } from "react";
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
      className="relative w-[52px] h-[28px] rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg,#1a1a1a,#0d0d0d)"
          : "linear-gradient(135deg,#e8e0d0,#d4c9b8)",
        borderColor: isDark
          ? "rgba(201,169,110,0.35)"
          : "rgba(140,106,50,0.35)",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
          className="transition-opacity duration-300"
          style={{ color: isDark ? "#0d0d0d" : "#b0a088", opacity: isDark ? 1 : 0 }}
        />
      </span>
      <span className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none">
        <Sun
          size={12}
          className="transition-opacity duration-300"
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

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const cached = localStorage.getItem("profileImage");
    if (cached) setProfileImage(cached);

    fetch("/api/settings")
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.profileImage) {
          setProfileImage(d.profileImage);
          localStorage.setItem("profileImage", d.profileImage);
        }
      })
      .catch(() => {});
  }, []);

  const headerBg = scrolled
    ? isDark
      ? "rgba(13,13,13,0.8)"
      : "rgba(240,237,232,0.8)"
    : "transparent";

  return (
    <>
      <header
        style={{ background: headerBg }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md
          ${scrolled ? "py-3 border-b border-[var(--glass-border)]" : "py-5"}
        `}
      >
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
                  loading="eager"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, var(--gold-subtle), transparent)" }}
                />
              )}
            </div>
            <div>
              <div
                className="font-playfair font-semibold text-sm leading-tight"
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
                className="relative px-5 py-2 text-sm font-dm transition-colors duration-200"
                style={{ color: pathname === link.href ? "var(--gold)" : "var(--text-muted)" }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ background: "var(--gold)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-5 py-2 text-sm font-dm font-medium rounded-lg border border-[var(--glass-border)] hover:bg-[var(--gold-subtle)] transition-colors duration-200"
              style={{ color: "var(--gold)" }}
            >
              للتواصل
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--glass-border)]"
              style={{ color: "var(--gold)" }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-xl"
            style={{ background: isDark ? "rgba(13,13,13,0.95)" : "rgba(240,237,232,0.95)" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--glass-border)]"
              style={{ color: "var(--gold)" }}
            >
              <X size={18} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
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
