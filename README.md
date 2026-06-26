<<<<<<< HEAD
# عمرو خالد الجمل — محفظة عمل Full-Stack

محفظة عمل (Portfolio) حديثة متكاملة لمطور Full-Stack، مبنية بـ **Next.js 14** مع **Three.js** للرسومات ثلاثية الأبعاد، و **Neon PostgreSQL** لقاعدة البيانات، و **Cloudinary** لإدارة الصور.

## 🌟 المميزات

- ✅ **واجهة مستخدم حديثة** بتصميم Glassmorphism و Gradient
- ✅ **وضع ليل/نهاري** متقدم مع حفظ التفضيلات
- ✅ **رسومات 3D تفاعلية** (لوحة مفاتيح طائرة بـ Three.js)
- ✅ **لوحة تحكم آمنة** محمية بكلمة مرور (مسار غريب: `/studio-x7k`)
- ✅ **إدارة كاملة للمحتوى**:
  - المشاريع (إنشاء، تعديل، حذف، إخفاء، تمييز)
  - الصور (غلاف + معرض)
  - المهارات والتقنيات
  - الخبرات الوظيفية
  - الرسائل والإحصائيات
- ✅ **رفع الصور إلى Cloudinary** مباشرة من لوحة التحكم
- ✅ **قاعدة بيانات PostgreSQL** عبر Neon (serverless)
- ✅ **دعم العربية الكامل** (RTL) مع بيانات حقيقية من DB

## 🛠️ المتطلبات

- Node.js 18+
- npm أو yarn
- حساب Neon (قاعدة بيانات PostgreSQL مجانية)
- حساب Cloudinary (تخزين صور مجاني)

## 📋 التثبيت والإعداد

### 1️⃣ استنساخ المشروع
```bash
git clone <repository-url>
cd eng-amro
npm install
```

### 2️⃣ إعداد قاعدة البيانات (Neon)

1. انتقل إلى [neon.tech](https://neon.tech) وأنشئ حساباً مجانياً
2. أنشئ مشروع جديد واحصل على `DATABASE_URL`
3. انسخ الاتصال إلى `.env.local`

### 3️⃣ إعداد Cloudinary

1. انتقل إلى [cloudinary.com](https://cloudinary.com) وأنشئ حساباً
2. اذهب إلى Dashboard وانسخ `Cloud Name`
3. أنشئ "Unsigned Upload Preset" في الإعدادات
4. أضف البيانات إلى `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name
```

### 4️⃣ إعداد المصادقة (NextAuth)

```bash
# توليد مفتاح سري
openssl rand -base64 32
```

أضف إلى `.env.local`:
```env
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
ADMIN_PASSWORD=your-secure-password
```

### 5️⃣ تطبيق قاعدة البيانات

```bash
# تشغيل SQL migration
psql $DATABASE_URL < prisma/migration.sql

# تعبئة البيانات الأولية
psql $DATABASE_URL < prisma/seed.sql
```

### 6️⃣ التطوير

```bash
npm run dev
```

الموقع: http://localhost:3000  
لوحة التحكم: http://localhost:3000/studio-x7k  
كلمة المرور: `your-admin-password` (من الـ .env)

## 📁 هيكل المشروع

```
eng-amro/
├── app/
│   ├── api/
│   │   ├── projects/         # API عام للمشاريع
│   │   ├── skills/           # API عام للمهارات
│   │   ├── admin/            # جميع endpoints الإدارة
│   │   ├── contact/          # نموذج التواصل
│   │   └── auth/             # NextAuth
│   ├── studio-x7k/           # لوحة التحكم (مسار غريب)
│   │   ├── login/            # صفحة تسجيل الدخول
│   │   ├── projects/         # إدارة المشاريع
│   │   ├── skills/           # إدارة المهارات
│   │   ├── messages/         # عرض الرسائل
│   │   ├── settings/         # الإعدادات العامة
│   │   └── experiences/      # الخبرات الوظيفية
│   ├── (public pages)
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   ├── works/            # معرض الأعمال
│   │   ├── about/            # عن المطور
│   │   └── contact/          # نموذج التواصل
│   ├── components/           # مكونات مشتركة
│   └── lib/                  # مساعدات وهوكات
├── prisma/
│   ├── schema.prisma         # نموذج قاعدة البيانات
│   ├── migration.sql         # إنشاء الجداول
│   └── seed.sql              # البيانات الأولية
└── .env.local                # متغيرات البيئة
```

## 🎨 التخصيص

### تغيير ألوان الموقع

قم بتعديل الألوان في `app/globals.css`:
```css
/* Dark mode (الوضع الليلي) */
--bg: #0D0D0D;
--gold: #C9A96E;

/* Light mode (الوضع النهاري) */
--bg-light: #F0EDE8;
--gold-light: #8C6A32;
```

### تعديل البيانات

كل المحتوى يأتي من قاعدة البيانات:
- **المشاريع**: عبر `/studio-x7k/projects`
- **المهارات**: عبر `/studio-x7k/skills`
- **الإعدادات**: عبر `/studio-x7k/settings`

## 🚀 النشر (Deployment)

### نشر على Vercel (الخيار الأفضل)

```bash
npm install -g vercel
vercel
```

ثم أضف متغيرات البيئة في لوحة Vercel.

### نشر على Railway أو Render

كلاهما يدعم Next.js و PostgreSQL مباشرة.

## 🔐 الأمان

- ⚠️ **غير آمن تماماً**: كلمة مرور بسيطة فقط
- ✅ **الأفضل**: استخدم OAuth (Google, GitHub) للمصادقة الفعلية
- ✅ **جلسة المسؤول**: 3 ساعات فقط (يمكن التغيير في `app/lib/auth.ts`)

## 📦 التبعيات الرئيسية

- `next` - إطار عمل React الحديث
- `next-auth` - المصادقة
- `framer-motion` - الرسوم المتحركة
- `three.js` - الرسومات ثلاثية الأبعاد
- `@neondatabase/serverless` - اتصال قاعدة البيانات
- `next-cloudinary` - رفع الصور
- `tailwindcss` - تصميم CSS

## 📝 الترخيص

جميع الأكواد مفتوحة المصدر ومتاحة للاستخدام الشخصي والتجاري.

## 🤝 المساهمة

يرحب بأي مساهمات! تفضل بفتح PR أو Issue.

---

**صُنع بـ ❤️ بواسطة عمرو خالد الجمل**
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
