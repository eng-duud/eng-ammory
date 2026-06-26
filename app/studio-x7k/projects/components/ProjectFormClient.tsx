"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, ImagePlus, Loader } from "lucide-react";

interface Props { projectId?: string; }

export default function ProjectForm({ projectId }: Props) {
  const router = useRouter();
  const isEdit = !!projectId;

  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving]         = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [form, setForm] = useState({
    title:"", titleEn:"", description:"", descriptionLong:"",
    categoryId:"", liveUrl:"", githubUrl:"",
    featured:false, hidden:false, order:0,
    color:"#1a3a5c", accent:"#4a9eff", year: new Date().getFullYear().toString(),
    coverImage:"", tech:[] as string[], images:[] as {id?:string;url:string;alt:string}[],
  });
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    fetch("/api/categories").then(r=>r.json()).then(setCategories);
    if (isEdit) {
      fetch(`/api/admin/projects/${projectId}`).then(r=>r.json()).then(p=>{
        if (p && !p.error) {
          setForm({
            title:p.title||"", titleEn:p.title_en||"", description:p.description||"",
            descriptionLong:p.description_long||"", categoryId:p.category_id||"",
            liveUrl:p.live_url||"", githubUrl:p.github_url||"",
            featured:p.featured||false, hidden:p.hidden||false, order:p.order||0,
            color:p.color||"#1a3a5c", accent:p.accent||"#4a9eff", year:p.year||"",
            coverImage:p.cover_image||"",
            tech:(p.tech||[]).map((t:any)=>typeof t==="string"?t:t.name),
            images:(p.images||[]).map((img:any)=>({id:img.id,url:img.url,alt:img.alt||""})),
          });
        }
      });
    }
  }, [projectId]);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method:"POST", body:fd });
    const data = await res.json();
    return data.secure_url;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingCover(true);
    try { const url = await uploadToCloudinary(file); setForm(f=>({...f,coverImage:url})); }
    finally { setUploadingCover(false); }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files||[]); if (!files.length) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setForm(f=>({...f,images:[...f.images,...urls.map(url=>({url,alt:""}))]}));
    } finally { setUploadingGallery(false); }
  };

  const save = async () => {
    if (!form.title||!form.description||!form.categoryId) { alert("يرجى ملء الحقول المطلوبة"); return; }
    setSaving(true);
    try {
      const body = { ...form, coverImage:form.coverImage||null };
      const url  = isEdit ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
      const res  = await fetch(url, { method:isEdit?"PUT":"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
      const proj = await res.json();
      if (!res.ok) throw new Error(proj.error||"Error");

      if (isEdit) {
        const freshImages = form.images.filter(i=>!i.id);
        for (const img of freshImages) {
          await fetch(`/api/admin/projects/${projectId}/images`,{
            method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({url:img.url,alt:img.alt,order:0})
          });
        }
      } else {
        for (const img of form.images) {
          await fetch(`/api/admin/projects/${proj.id}/images`,{
            method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({url:img.url,alt:img.alt,order:0})
          });
        }
      }
      router.push("/studio-x7k/projects");
    } catch (e:any) { alert(e.message); } finally { setSaving(false); }
  };

  const removeImage = async (idx:number) => {
    const img = form.images[idx];
    if (img.id && isEdit) {
      await fetch(`/api/admin/projects/${projectId}/images`,{
        method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({imageId:img.id})
      });
    }
    setForm(f=>({...f,images:f.images.filter((_,i)=>i!==idx)}));
  };

  const inp = "input-gold mb-1";
  const lbl = "block font-dm text-xs mb-1.5 uppercase tracking-wider";

  return (
    <div className="max-w-4xl space-y-8">
      <div className="glass rounded-2xl p-6">
        <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>المعلومات الأساسية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={lbl} style={{color:"var(--text-faint)"}}>العنوان *</label>
            <input className={inp} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="اسم المشروع"/>
          </div>
          <div>
            <label className={lbl} style={{color:"var(--text-faint)"}}>العنوان بالإنجليزية</label>
            <input className={inp} value={form.titleEn} onChange={e=>setForm(f=>({...f,titleEn:e.target.value}))} placeholder="Project Name"/>
          </div>
          <div className="md:col-span-2">
            <label className={lbl} style={{color:"var(--text-faint)"}}>الوصف المختصر *</label>
            <textarea rows={2} className={`${inp} resize-none`} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="وصف قصير للمشروع"/>
          </div>
          <div className="md:col-span-2">
            <label className={lbl} style={{color:"var(--text-faint)"}}>الوصف التفصيلي</label>
            <textarea rows={4} className={`${inp} resize-none`} value={form.descriptionLong} onChange={e=>setForm(f=>({...f,descriptionLong:e.target.value}))} placeholder="وصف تفصيلي يظهر في صفحة المشروع"/>
          </div>
          <div>
            <label className={lbl} style={{color:"var(--text-faint)"}}>القسم *</label>
            <select className={inp} value={form.categoryId} onChange={e=>setForm(f=>({...f,categoryId:e.target.value}))}
              style={{background:"var(--glass-bg)",color:"var(--text)"}}>
              <option value="">اختر القسم</option>
              {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl} style={{color:"var(--text-faint)"}}>السنة</label>
            <input className={inp} value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} placeholder="2024"/>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>صورة الغلاف</h2>
        {form.coverImage ? (
          <div className="relative w-full max-w-md">
            <img src={form.coverImage} alt="Cover" className="w-full aspect-video object-cover rounded-xl"/>
            <button onClick={()=>setForm(f=>({...f,coverImage:""}))}
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
              style={{background:"rgba(0,0,0,0.7)",color:"white"}}>
              <X size={14}/>
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full max-w-md aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-colors"
            style={{borderColor:"var(--glass-border)",color:"var(--text-faint)"}}>
            {uploadingCover ? <Loader size={24} className="animate-spin"/> : <><ImagePlus size={32} className="mb-2"/><span className="font-dm text-sm">اضغط لرفع صورة الغلاف</span></>}
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploadingCover}/>
          </label>
        )}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>معرض الصور</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {form.images.map((img,i)=>(
            <div key={i} className="relative aspect-video rounded-lg overflow-hidden group">
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover"/>
              <button onClick={()=>removeImage(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{background:"rgba(0,0,0,0.7)",color:"white"}}>
                <X size={12}/>
              </button>
            </div>
          ))}
          <label className="aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors"
            style={{borderColor:"var(--glass-border)",color:"var(--text-faint)"}}>
            {uploadingGallery ? <Loader size={20} className="animate-spin"/> : <><Plus size={20}/><span className="font-dm text-xs mt-1">إضافة صور</span></>}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} disabled={uploadingGallery}/>
          </label>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>التقنيات المستخدمة</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {form.tech.map(t=>(
            <span key={t} className="flex items-center gap-1.5 font-dm text-sm px-3 py-1.5 rounded-full"
              style={{background:"var(--gold-subtle)",color:"var(--gold)",border:"1px solid var(--glass-border)"}}>
              {t}
              <button onClick={()=>setForm(f=>({...f,tech:f.tech.filter(x=>x!==t)}))}><X size={12}/></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="input-gold flex-1" value={newTech} placeholder="مثال: React"
            onChange={e=>setNewTech(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&newTech.trim()){setForm(f=>({...f,tech:[...f.tech,newTech.trim()]}));setNewTech("");}}}/>
          <button onClick={()=>{if(newTech.trim()){setForm(f=>({...f,tech:[...f.tech,newTech.trim()]}));setNewTech("");}}}
            className="px-4 py-2 rounded-lg font-dm text-sm" style={{background:"var(--gold)",color:"var(--bg)"}}>
            <Plus size={16}/>
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-playfair text-xl mb-6" style={{color:"var(--text)"}}>الإعدادات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} className="w-5 h-5 rounded"/>
            <label htmlFor="featured" className="font-dm text-sm cursor-pointer" style={{color:"var(--text)"}}>مشروع مميز</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="hidden" checked={form.hidden} onChange={e=>setForm(f=>({...f,hidden:e.target.checked}))} className="w-5 h-5 rounded"/>
            <label htmlFor="hidden" className="font-dm text-sm cursor-pointer" style={{color:"var(--text)"}}>إخفاء من الموقع</label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pb-8">
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-8 py-3 font-dm font-semibold rounded-lg transition-all disabled:opacity-60"
          style={{background:"var(--gold)",color:"var(--bg)"}}>
          {saving ? <Loader size={16} className="animate-spin"/> : null}
          {saving ? "جاري الحفظ..." : isEdit ? "حفظ التغييرات" : "إنشاء المشروع"}
        </button>
        <button onClick={()=>router.push("/studio-x7k/projects")} className="px-6 py-3 font-dm rounded-lg transition-all"
          style={{border:"1px solid var(--glass-border)",color:"var(--text-muted)"}}>إلغاء</button>
      </div>
    </div>
  );
}
