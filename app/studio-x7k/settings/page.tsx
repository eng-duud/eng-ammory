"use client";
import { useEffect, useState } from "react";
import { Save, Loader, ImagePlus, X, FileUp, Download } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);

  const loadSettings = async () => {
    try {
      // Fetch from admin API to ensure we get the latest even if public is cached
      const r = await fetch("/api/admin/settings");
      const d = await r.json();
      if (r.ok) setSettings(d || {});
    } catch (e) {
      console.error("Failed to load settings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method:"POST", body:fd });
    const data = await res.json();
    return data.secure_url;
  };

  const uploadFileToCloudinary = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`, { method:"POST", body:fd });
    const data = await res.json();
    return data.secure_url;
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingImage(true);
    try { 
      const url = await uploadToCloudinary(file); 
      setSettings(s=>({...s,profileImage:url})); 
    } catch (e) {
      alert("فشل رفع الصورة!");
    } finally { 
      setUploadingImage(false); 
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.includes('pdf') && !file.name.endsWith('.doc') && !file.name.endsWith('.docx')) {
      alert("يرجى رفع ملف PDF أو Word فقط");
      return;
    }
    setUploadingCV(true);
    try { 
      const url = await uploadFileToCloudinary(file); 
      setSettings(s=>({...s,cvUrl:url})); 
    } catch (e) {
      alert("فشل رفع الملف!");
    } finally { 
      setUploadingCV(false); 
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(settings)
      });
      if (!res.ok) throw new Error("Failed to save");
      
      alert("تم الحفظ بنجاح!");
      // Re-load settings from server to ensure state is in sync
      await loadSettings();
    } catch (e) { 
      alert("حدث خطأ أثناء الحفظ!"); 
    } finally { 
      setSaving(false); 
    }
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
          {/* Profile Image Section */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>الصورة الشخصية</h2>
            <div className="space-y-4">
              {settings.profileImage ? (
                <div className="relative w-full max-w-xs">
                  <img src={settings.profileImage} alt="Profile" className="w-full aspect-square object-cover rounded-xl"/>
                  <button onClick={()=>setSettings(s=>({...s,profileImage:""}))}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{background:"rgba(0,0,0,0.7)",color:"white"}}>
                    <X size={14}/>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full max-w-xs aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-colors"
                  style={{borderColor:"var(--glass-border)",color:"var(--text-faint)"}}>
                  {uploadingImage ? <Loader size={32} className="animate-spin"/> : <><ImagePlus size={40} className="mb-2"/><span className="font-dm text-sm">اضغط لرفع الصورة</span></>}
                  <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} disabled={uploadingImage}/>
                </label>
              )}
            </div>
          </div>

          {/* CV Section */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>السيرة الذاتية</h2>
            <div className="space-y-4">
              {settings.cvUrl ? (
                <div className="flex items-center justify-between p-4 rounded-lg border" style={{borderColor:"var(--glass-border)",background:"var(--glass-bg)"}}>
                  <div className="flex items-center gap-3">
                    <FileUp size={24} style={{color:"var(--gold)"}}/>
                    <div>
                      <p className="font-dm text-sm" style={{color:"var(--text)"}}>ملف السيرة الذاتية</p>
                      <p className="font-dm text-xs" style={{color:"var(--text-faint)"}}>تم الرفع بنجاح</p>
                    </div>
                  </div>
                  <button onClick={()=>setSettings(s=>({...s,cvUrl:""}))}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{background:"rgba(0,0,0,0.7)",color:"white"}}>
                    <X size={14}/>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full p-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors"
                  style={{borderColor:"var(--glass-border)",color:"var(--text-faint)"}}>
                  {uploadingCV ? <Loader size={32} className="animate-spin"/> : <><FileUp size={40} className="mb-2"/><span className="font-dm text-sm">اضغط لرفع السيرة الذاتية (PDF أو Word)</span></>}
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCVUpload} disabled={uploadingCV}/>
                </label>
              )}
            </div>
          </div>

          {/* Profile Information Section */}
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
