
cat > /mnt/user-data/outputs/SETUP_GUIDE.md << 'EOF'
# 🚀 دليل الإعداد السريع - محفظة عمرو الجمل Full-Stack

## ✅ ما تم بناؤه

### 1️⃣ الواجهة العامة (Public Pages)
- ✨ **الصفحة الرئيسية** - عرض المشاريع المميزة والإحصائيات
- 📂 **معرض الأعمال** - عرض جميع المشاريع مع التصفية حسب الفئة
- 📄 **صفحة المشروع** - تفاصيل المشروع الكاملة مع المعرض
- 👤 **عن المطور** - السيرة الذاتية والخبرات والمهارات
- 📧 **نموذج التواصل** - حفظ الرسائل في قاعدة البيانات

### 2️⃣ لوحة التحكم الآمنة (`/studio-x7k`)
- 🔐 **تسجيل الدخول** - كلمة مرور قوية + جلسة 3 ساعات
- 📊 **لوحة التحكم** - إحصائيات سريعة عن المحتوى
- 🎨 **إدارة المشاريع**
  - ✏️ إنشاء/تعديل/حذف المشاريع
  - 🖼️ رفع الغلاف والمعرض (Cloudinary)
  - ⭐ تمييز المشاريع المهمة
  - 👁️ إخفاء المشاريع من الموقع
  - 🔧 إضافة التقنيات المستخدمة
- 🏆 **إدارة المهارات** - CRUD كامل مع التقسيم حسب الفئات
- 💬 **إدارة الرسائل** - عرض الرسائل الواردة وتمييز المقروءة
- ⚙️ **الإعدادات** - تحديث المعلومات الشخصية والروابط
- 💼 **الخبرات الوظيفية** - إدارة المسيرة الوظيفية

### 3️⃣ قاعدة البيانات
- **PostgreSQL على Neon** (مجاني وسهل)
- جداول منظمة لكل القطاعات:
  - Projects, ProjectImages, ProjectTech
  - Categories, Skills, SkillGroups
  - Experiences, Stats, Messages, Settings

### 4️⃣ المميزات التقنية
- 🌙 **وضع ليل/نهاري** متقدم مع حفظ التفضيلات
- 🎪 **رسومات 3D** (لوحة مفاتيح طائرة بـ Three.js)
- 🎨 **تصميم حديث** (Glassmorphism, Gradients, Animations)
- 📱 **responsive design** - يعمل على جميع الأجهزة
- 🌍 **دعم كامل للعربية** (RTL + بيانات عربية)

---

## 🔧 التثبيت خطوة بخطوة

### الخطوة 1: استخراج الملفات
```bash
unzip eng-amro-fullstack-complete.zip
cd eng-amro
npm install
```

### الخطوة 2: إنشاء حسابات خارجية

#### أ) Neon Database (قاعدة البيانات)
1. اذهب إلى [neon.tech](https://neon.tech)
2. اشترك بحساب Google/GitHub مجاني
3. أنشئ مشروع جديد → احصل على `DATABASE_URL`
4. انسخ الـ URL كاملاً (مثلاً: `postgresql://user:pass@...`)

#### ب) Cloudinary (تخزين الصور)
1. اذهب إلى [cloudinary.com](https://cloudinary.com)
2. اشترك بحساب مجاني
3. اذهب إلى Dashboard → انسخ **Cloud Name**
4. اذهب إلى Settings → Upload → Create Unsigned Preset
   - اسمه: `next-portfolio` (مثلاً)
   - اختر **Unsigned**
5. احفظ الاسم

### الخطوة 3: إنشاء ملف `.env.local`

```bash
cp .env.example .env.local
```

ثم عدّل `.env.local` وأضف:

```env
# ─── Database ────────────────────
DATABASE_URL="postgresql://user:password@host.c-4.us-east-1.aws.neon.tech/dbname?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://user:password@host.c-4.us-east-1.aws.neon.tech/dbname?sslmode=require&channel_binding=require"

# ─── Cloudinary ──────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="next-portfolio"

# ─── NextAuth ────────────────────
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# ─── Admin Password ──────────────
ADMIN_PASSWORD="your-strong-password-here"
```

**لتوليد NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### الخطوة 4: إعداد قاعدة البيانات

```bash
# 1. تطبيق الهيكل (الجداول)
psql $DATABASE_URL -f prisma/migration.sql

# 2. إدراج البيانات الأولية
psql $DATABASE_URL -f prisma/seed.sql
```

**أو من خلال واجهة Neon:**
1. اذهب إلى لوحة Neon
2. انقر على SQL Editor
3. ألصق محتوى `prisma/migration.sql`
4. نفّذها
5. كرر مع `prisma/seed.sql`

### الخطوة 5: تشغيل المشروع

```bash
npm run dev
```

**ستظهر:**
- 🌐 الموقع: http://localhost:3000
- 🔐 لوحة التحكم: http://localhost:3000/studio-x7k
- كلمة المرور: ما أدخلته في `ADMIN_PASSWORD`

---

## 📍 المسارات المهمة

| المسار | الوصف |
|--------|-------|
| `/` | الصفحة الرئيسية |
| `/works` | معرض الأعمال |
| `/works/[slug]` | تفاصيل المشروع |
| `/about` | عن المطور |
| `/contact` | نموذج التواصل |
| `/studio-x7k` | لوحة التحكم |
| `/studio-x7k/login` | تسجيل الدخول |
| `/studio-x7k/projects` | إدارة المشاريع |
| `/studio-x7k/skills` | إدارة المهارات |
| `/studio-x7k/messages` | الرسائل الواردة |
| `/studio-x7k/settings` | الإعدادات |
| `/studio-x7k/experiences` | الخبرات الوظيفية |

---

## 🎨 التخصيص

### تغيير الألوان
عدّل `app/globals.css`:
```css
:root[data-theme="dark"] {
  --gold: #C9A96E;    /* اللون الأساسي */
  --bg: #0D0D0D;      /* خلفية الظلام */
}

:root[data-theme="light"] {
  --gold: #8C6A32;
  --bg: #F0EDE8;
}
```

### تغيير المحتوى
كل شيء يأتي من قاعدة البيانات:
- **المشاريع**: أضف عبر `/studio-x7k/projects`
- **المهارات**: أضف عبر `/studio-x7k/skills`
- **الإعدادات**: عدّل عبر `/studio-x7k/settings`

---

## 🚀 النشر على الإنترنت

### خيار 1: Vercel (الأفضل للـ Next.js)

```bash
npm install -g vercel
vercel
```

ثم:
1. اختر GitHub كمصدر
2. في لوحة Vercel، أضف متغيرات البيئة من `.env.local`

### خيار 2: Railway أو Render
كلاهما يدعم PostgreSQL و Next.js مباشرة - فقط ربط المستودع وأضف البيانات.

---

## 🔐 الأمان

⚠️ **تنبيهات أمنية:**
- كلمة المرور بسيطة جداً - اجعلها قوية!
- لا تضع `ADMIN_PASSWORD` في الـ Git
- استخدم `NEXTAUTH_SECRET` عشوائي قوي
- لا تشارك `DATABASE_URL` مع أحد

✅ **تحسينات مقترحة:**
- أضف OAuth (Google/GitHub)
- أضف Two-Factor Authentication
- استخدم HTTPS دائماً
- اصنع backup دوري لقاعدة البيانات

---

## 🐛 حل المشاكل

### لا يتصل بقاعدة البيانات
```
✅ تحقق: هل DATABASE_URL صحيح؟
✅ تحقق: هل Neon يسمح بـ outbound connections؟
✅ تحقق: هل اسم قاعدة البيانات موجود؟
```

### الصور لا ترفع إلى Cloudinary
```
✅ تحقق: اسم الـ Cloud Name صحيح؟
✅ تحقق: اسم Upload Preset صحيح؟
✅ تحقق: أن الـ Preset يكون "Unsigned"
```

### لا تدخل لوحة التحكم
```
✅ تحقق: هل ADMIN_PASSWORD صحيح؟
✅ تحقق: هل NEXTAUTH_SECRET موجود؟
✅ تحقق: افتح Developer Console وشوف الأخطاء
```

---

## 📚 البنية الملفات الرئيسية

```
app/
├── page.tsx                 # الصفحة الرئيسية
├── about/page.tsx           # عن المطور
├── works/page.tsx           # معرض الأعمال
├── contact/page.tsx         # نموذج التواصل
├── studio-x7k/              # لوحة التحكم
│   ├── login/page.tsx
│   ├── projects/page.tsx
│   ├── skills/page.tsx
│   ├── messages/page.tsx
│   └── settings/page.tsx
├── api/                     # جميع الـ API endpoints
│   ├── admin/               # endpoints محمية
│   └── public endpoints
└── lib/
    ├── db.ts                # اتصال قاعدة البيانات
    └── auth.ts              # إعدادات NextAuth

prisma/
├── migration.sql            # إنشاء الجداول
├── seed.sql                 # البيانات الأولية
└── schema.prisma            # تعريف الجداول (للمرجع)
```

---

## 🎯 الخطوات التالية

1. **تخصيص المحتوى**
   - غيّر الاسم والصورة والمعلومات الشخصية
   - أضف صورتك وروابطك

2. **إضافة مشاريعك**
   - ادخل لوحة التحكم → المشاريع → مشروع جديد
   - أضف الغلاف والصور والتقنيات

3. **نشر الموقع**
   - ربط مع Vercel/Railway
   - تفعيل المجال الخاص بك
   - إعداد SSL certificate

4. **تحسين الأداء**
   - استخدم Next Image للصور
   - أضف robots.txt و sitemap.xml
   - قيّم الأداء مع PageSpeed

---

## 📞 الدعم

إذا واجهت مشكلة:
1. ✅ تحقق من الأخطاء في Console
2. ✅ اقرأ الـ README.md
3. ✅ تفقد متغيرات البيئة

---

**صُنع بـ ❤️ جاهز للعمل!**
EOF

cat /mnt/user-data/outputs/SETUP_GUIDE.md | wc -l
echo "✓ SETUP_GUIDE.md جاهز"