"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
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
      {/* Track fill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="absolute inset-[3px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at 40% 40%, #C9A96E 0%, #A07840 100%)"
            : "radial-gradient(circle at 60% 40%, #f5d98b 0%, #e8c55a 100%)",
        }}
        animate={{ width: isDark ? "22px" : "22px", x: isDark ? 0 : 24 }}
        initial={false}
      />
      {/* Icons */}
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
  const pathname = usePathname();
  const { theme }  = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Header bg changes per theme */
  const headerBg = scrolled
    ? isDark
      ? "rgba(13,13,13,0.88)"
      : "rgba(240,237,232,0.88)"
    : "transparent";

=======
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية", labelEn: "Home" },
  { href: "/about", label: "عني", labelEn: "About" },
  { href: "/works", label: "أعمالي", labelEn: "Works" },
  { href: "/contact", label: "تواصل", labelEn: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
<<<<<<< HEAD
        style={{ background: headerBg }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl
          ${scrolled ? "border-b py-4" : "py-6"}
        `}
        css-border={scrolled ? "1px solid var(--glass-border)" : undefined}
      >
        {/* border via inline style so it reads the CSS var */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "var(--glass-border)" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{ border: "1px solid var(--glass-border)" }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, var(--gold-subtle), transparent)" }}
              />
              <span
                className="font-playfair font-bold text-lg relative z-10"
                style={{ color: "var(--gold)" }}
              >ع</span>
            </div>
            <div>
              <div
                className="font-playfair font-semibold text-sm leading-tight transition-colors duration-300"
                style={{ color: "var(--text)" }}
              >عمرو الجمل</div>
              <div className="text-xs font-dm" style={{ color: "var(--gold)" }}>Developer</div>
=======
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-[#C9A96E]/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-[#C9A96E]/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/20 to-transparent" />
              <span className="font-playfair text-[#C9A96E] font-bold text-lg relative z-10">ع</span>
            </div>
            <div>
              <div className="font-playfair text-white font-semibold text-sm leading-tight">عمرو الجمل</div>
              <div className="text-[#C9A96E]/60 text-xs font-dm">Developer</div>
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
<<<<<<< HEAD
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-dm transition-all duration-300"
                style={{ color: pathname === link.href ? "var(--gold)" : "var(--text-muted)" }}
=======
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-dm transition-all duration-300 group ${
                  pathname === link.href ? "text-[#C9A96E]" : "text-[#888] hover:text-white"
                }`}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
<<<<<<< HEAD
                    layoutId="nav-bar"
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,var(--gold),transparent)" }}
=======
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                  />
                )}
              </Link>
            ))}
          </nav>

<<<<<<< HEAD
          {/* Right side: toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="mailto:amro@example.com"
              className="relative px-6 py-2.5 text-sm font-dm font-medium rounded-lg overflow-hidden group transition-all duration-300"
              style={{ border: "1px solid var(--glass-border)", color: "var(--gold)" }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                style={{ background: "var(--gold-subtle)" }}
              />
              <span className="relative">للتواصل</span>
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
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

      {/* Mobile menu overlay */}
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
=======
          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:amro@example.com"
              className="relative px-6 py-2.5 text-sm font-dm font-medium overflow-hidden group"
            >
              <div className="absolute inset-0 border border-[#C9A96E]/40 rounded-lg transition-colors group-hover:border-[#C9A96E]" />
              <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/10 rounded-lg transition-colors" />
              <span className="relative text-[#C9A96E]">للتواصل</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-[#C9A96E]/20 rounded-lg text-[#C9A96E]"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-[#C9A96E]/20 rounded-lg text-[#C9A96E]"
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
            >
              <X size={18} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
<<<<<<< HEAD
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
=======
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
<<<<<<< HEAD
                    className="font-playfair text-4xl font-bold transition-colors"
                    style={{ color: pathname === link.href ? "var(--gold)" : "var(--text)" }}
=======
                    className={`font-playfair text-3xl font-bold transition-colors ${
                      pathname === link.href ? "text-[#C9A96E]" : "text-white hover:text-[#C9A96E]"
                    }`}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
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
