"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!password) return;
    setLoading(true); setError("");
    const res = await signIn("credentials", { password, redirect: false });
    if (res?.ok) router.push("/studio-x7k");
    else { setError("كلمة المرور غير صحيحة"); setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{background:"var(--bg)"}}>
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.7}}
        className="w-full max-w-sm">
        <div className="glass rounded-2xl p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{background:"linear-gradient(135deg,var(--gold-subtle),transparent)",border:"1px solid var(--glass-border)"}}>
              <Lock size={24} style={{color:"var(--gold)"}}/>
            </div>
            <h1 className="font-playfair text-2xl" style={{color:"var(--text)"}}>لوحة التحكم</h1>
            <p className="font-dm text-xs mt-1" style={{color:"var(--text-faint)"}}>ادخل كلمة المرور للمتابعة</p>
          </div>

          {error && (
            <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
              className="mb-5 p-3 rounded-lg text-sm font-dm text-center"
              style={{background:"rgba(239,68,68,0.1)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.2)"}}>
              {error}
            </motion.div>
          )}

          <div className="relative mb-6">
            <input
              type={show?"text":"password"} placeholder="كلمة المرور" value={password}
              onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
              className="input-gold pr-4 pl-12" autoFocus/>
            <button onClick={()=>setShow(!show)}
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
              style={{color:"var(--text-faint)"}}>
              {show ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>

          <button onClick={handleSubmit} disabled={loading||!password}
            className="w-full py-3.5 font-dm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            style={{background:"var(--gold)",color:"var(--bg)"}}>
            {loading ? <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{borderColor:"rgba(0,0,0,.3)",borderTopColor:"var(--bg)"}}/> : "دخول"}
          </button>
        </div>
        <p className="text-center mt-6 font-dm text-xs" style={{color:"var(--text-faint)"}}>
          هذه الصفحة مخصصة للمشرف فقط
        </p>
      </motion.div>
    </div>
  );
}
