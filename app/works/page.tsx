"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WorksPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{padding: "100px", textAlign: "center"}}>جاري التحميل...</div>;

  return (
    <div style={{padding: "120px 20px", maxWidth: "1200px", margin: "0 auto", direction: "rtl"}}>
      <h1 style={{fontSize: "3rem", marginBottom: "40px"}}>المشاريع</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px"}}>
        {projects.map((p: any) => (
          <div key={p.id} style={{border: "1px solid #ccc", padding: "20px", borderRadius: "10px"}}>
            <Link href={`/works/${p.slug || p.id}`}>
              <h2 style={{fontSize: "1.5rem", marginBottom: "10px"}}>{p.title}</h2>
            </Link>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
      {projects.length === 0 && <p>لا توجد مشاريع حالياً</p>}
    </div>
  );
}
