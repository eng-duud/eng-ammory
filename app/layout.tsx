import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "عمرو خالد الجمل — مطور أنظمة ومواقع",
  description: "محفظة أعمال المطور عمرو خالد الجمل — مطور أنظمة ومواقع بدقة عالية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
      </body>
    </html>
  );
}
