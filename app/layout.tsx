import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< HEAD
import { ThemeProvider } from "./components/ThemeProvider";
=======
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953

export const metadata: Metadata = {
  title: "عمرو خالد الجمل — مطور أنظمة ومواقع",
  description: "محفظة أعمال المطور عمرو خالد الجمل — مطور أنظمة ومواقع بدقة عالية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Prevent flash: set theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Header />
          <main className="content-layer">{children}</main>
          <Footer />
        </ThemeProvider>
=======
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-[#0D0D0D] text-white antialiased">
        <Header />
        <main className="content-layer">
          {children}
        </main>
        <Footer />
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
      </body>
    </html>
  );
}
