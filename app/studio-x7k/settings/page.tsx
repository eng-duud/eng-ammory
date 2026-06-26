"use client";
import { useEffect, useState } from "react";
import { Save, Loader } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r=>r.json()).then(d=>{setSettings(d||{});setLoading(false);});
  }, []);

  const fields = [
    {key:"name",     label:"الاسم الكامل"},
    {key:"title",    label:"المسمى الوظيفي"},
    {key:"bio",      label:"النبذة الشخصية", rows:3},
    {key:"email",    label:"البريد الإلكتروني"},
    {key:"phone",    label:"رقم الهاتف"},
    {key:"location", label:"الموقع الجغرافي"},
    {key:"github",   label:"رابط GitHub"},
    {key:"linkedin", label:"رابط LinkedIn"},
    {key:"twitter",  label:"رابط Twitter"},
    {key:"whatsapp", label:"رابط WhatsApp"},
  ];

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings",{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(settings)
      });
      alert("تم الحفظ بنجاح!");
    } catch { alert("حدث خطأ!"); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>الإعدادات</h1>
        <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>معلومات الموقع والبيانات الشخصية</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{borderColor:"var(--bg-300)",borderTopColor:"var(--gold)"}}/>
        </div>
      ) : (
        <div className="max-w-2xl space-y-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>معلومات الملف الشخصي</h2>
            <div className="space-y-4">
              {fields.map(f=>(
                <div key={f.key}>
                  <label className="block font-dm text-xs mb-2 uppercase tracking-wider" style={{color:"var(--text-faint)"}}>{f.label}</label>
                  {f.rows ? (
                    <textarea rows={f.rows} className="input-gold resize-none"
                      value={settings[f.key]||""} onChange={e=>setSettings({...settings,[f.key]:e.target.value})}/>
                  ) : (
                    <input className="input-gold" value={settings[f.key]||""} onChange={e=>setSettings({...settings,[f.key]:e.target.value})}/>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-8 py-3.5 font-dm font-semibold rounded-lg transition-all disabled:opacity-60"
            style={{background:"var(--gold)",color:"var(--bg)"}}>
            {saving ? <Loader size={16} className="animate-spin"/> : <Save size={16}/>}
            {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </button>
        </div>
      )}
    </div>
  );
}
