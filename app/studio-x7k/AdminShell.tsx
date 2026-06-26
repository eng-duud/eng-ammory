"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router  = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/studio-x7k/login") {
      router.push("/studio-x7k/login");
    }
  }, [status, pathname, router]);

  if (pathname === "/studio-x7k/login") return <>{children}</>;
  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center" style={{background:"var(--bg)"}}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
    </div>
  );
  if (!(session as any)?.isAdmin) return null;

  return (
    <div className="flex" style={{minHeight:"100vh",background:"var(--bg)"}}>
      <AdminSidebar/>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
