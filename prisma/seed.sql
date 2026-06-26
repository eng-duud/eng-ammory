-- ── CATEGORIES ──────────────────────────────────────────────────
INSERT INTO categories (id, name, slug, "order") VALUES
  ('cat_fs',  'Full-Stack', 'fullstack', 1),
  ('cat_fe',  'Frontend',   'frontend',  2),
  ('cat_mob', 'Mobile',     'mobile',    3)
ON CONFLICT (slug) DO NOTHING;

-- ── PROJECTS ────────────────────────────────────────────────────
INSERT INTO projects (id, title, title_en, slug, description, description_long, category_id, live_url, github_url, featured, hidden, "order", color, accent, year) VALUES
(
  'proj_1', 'نظام إدارة المستشفيات', 'Hospital Management System', 'hospital-management',
  'منصة متكاملة لإدارة المستشفيات تشمل إدارة المرضى والمواعيد والفواتير والموارد البشرية.',
  'نظام شامل يخدم أكثر من 15 مستشفى وعيادة، يوفر إدارة كاملة للعمليات الطبية والإدارية. يتضمن نظام تسجيل المرضى، جدولة الأطباء، إدارة الأسرّة، الفواتير الإلكترونية، والتقارير التحليلية المتقدمة.',
  'cat_fs', '#', '#', true, false, 1, '#1a3a5c', '#4a9eff', '2024'
),
(
  'proj_2', 'منصة التجارة الإلكترونية', 'E-Commerce Platform', 'ecommerce-platform',
  'منصة تسوق إلكتروني متعددة البائعين مع نظام دفع متكامل.',
  'منصة تجارة إلكترونية متكاملة تدعم المتاجر المتعددة، مع بوابة دفع آمنة، نظام تتبع الطلبات، لوحة تحكم البائع، وتطبيق جوال للمشترين.',
  'cat_fs', '#', '#', true, false, 2, '#2d1a4a', '#9b59b6', '2024'
),
(
  'proj_3', 'تطبيق إدارة المشاريع', 'Project Management App', 'project-management',
  'تطبيق ويب لإدارة المشاريع والفرق بتصميم متحرك ومميز.',
  'أداة إدارة مشاريع ذكية تجمع بين Kanban Board، تتبع الوقت، إدارة المهام، التعاون الفوري، والتقارير التحليلية.',
  'cat_fe', '#', '#', true, false, 3, '#1a3a1a', '#2ecc71', '2023'
),
(
  'proj_4', 'بوابة التعليم الذكي', 'Smart Learning Portal', 'smart-learning',
  'منصة تعليمية تفاعلية بالذكاء الاصطناعي لشخصنة تجربة التعلم.',
  'منصة تعليمية متطورة تستخدم الذكاء الاصطناعي لتحليل أسلوب تعلم كل طالب وتقديم محتوى مخصص.',
  'cat_fs', '#', '#', false, false, 4, '#3a1a1a', '#e74c3c', '2023'
),
(
  'proj_5', 'نظام المطاعم الذكي', 'Smart Restaurant System', 'smart-restaurant',
  'تطبيق إدارة مطاعم متكامل مع QR Code وطلبات فورية.',
  'نظام شامل يتيح للزبائن طلب الطعام عبر QR Code، يدير الطلبات والمطبخ بشكل فوري.',
  'cat_mob', '#', '#', false, false, 5, '#3a2a1a', '#e67e22', '2023'
),
(
  'proj_6', 'لوحة تحكم تحليلية', 'Analytics Dashboard', 'analytics-dashboard',
  'لوحة بيانات تحليلية متقدمة بتصورات بيانية تفاعلية.',
  'لوحة تحكم بيانات ضخمة مع أكثر من 50 نوع مخطط، تحديث في الوقت الفعلي، تصدير التقارير.',
  'cat_fe', '#', '#', false, false, 6, '#1a2a3a', '#3498db', '2022'
)
ON CONFLICT (slug) DO NOTHING;

-- ── PROJECT TECH ────────────────────────────────────────────────
INSERT INTO project_tech (project_id, name) VALUES
  ('proj_1','Next.js'),('proj_1','Laravel'),('proj_1','PostgreSQL'),('proj_1','Redis'),('proj_1','Docker'),('proj_1','AWS'),
  ('proj_2','React'),('proj_2','Node.js'),('proj_2','MongoDB'),('proj_2','Stripe'),('proj_2','Redis'),('proj_2','Tailwind'),
  ('proj_3','React'),('proj_3','TypeScript'),('proj_3','GraphQL'),('proj_3','Tailwind'),('proj_3','Framer Motion'),
  ('proj_4','Next.js'),('proj_4','Python'),('proj_4','FastAPI'),('proj_4','PostgreSQL'),('proj_4','OpenAI'),
  ('proj_5','Flutter'),('proj_5','Laravel'),('proj_5','MySQL'),('proj_5','Firebase'),
  ('proj_6','React'),('proj_6','D3.js'),('proj_6','TypeScript'),('proj_6','WebSocket');

-- ── SKILL GROUPS ────────────────────────────────────────────────
INSERT INTO skill_groups (id, name, slug, "order") VALUES
  ('sg_fe',     'Frontend', 'frontend', 1),
  ('sg_be',     'Backend',  'backend',  2),
  ('sg_devops', 'DevOps',   'devops',   3),
  ('sg_design', 'Design',   'design',   4)
ON CONFLICT (slug) DO NOTHING;

-- ── SKILLS ──────────────────────────────────────────────────────
INSERT INTO skills (name, level, "order", group_id) VALUES
  ('React / Next.js', 95, 1, 'sg_fe'),
  ('TypeScript',      92, 2, 'sg_fe'),
  ('Three.js',        75, 3, 'sg_fe'),
  ('Tailwind CSS',    95, 4, 'sg_fe'),
  ('Node.js',         88, 1, 'sg_be'),
  ('Laravel / PHP',   85, 2, 'sg_be'),
  ('PostgreSQL',      82, 3, 'sg_be'),
  ('MongoDB',         80, 4, 'sg_be'),
  ('GraphQL',         80, 5, 'sg_be'),
  ('Python',          70, 6, 'sg_be'),
  ('Redis',           75, 7, 'sg_be'),
  ('Docker',          78, 1, 'sg_devops'),
  ('AWS',             72, 2, 'sg_devops'),
  ('Git / CI-CD',     90, 3, 'sg_devops'),
  ('Figma',           85, 1, 'sg_design'),
  ('Flutter',         68, 1, 'sg_fe');

-- ── EXPERIENCES ─────────────────────────────────────────────────
INSERT INTO experiences (role, company, period, description, tech, "order") VALUES
  ('مطور Full-Stack أول', 'شركة تقنية رائدة', '2022 - الحاضر',
   'قيادة فريق من 5 مطورين لبناء منصات تقنية متكاملة لعملاء دوليين.',
   ARRAY['Next.js','Laravel','AWS'], 1),
  ('مطور Frontend متقدم', 'وكالة تصميم رقمي', '2020 - 2022',
   'تطوير واجهات مستخدم تفاعلية لأكثر من 30 مشروع متنوع.',
   ARRAY['React','TypeScript','Figma'], 2),
  ('مطور ويب', 'شركة ناشئة', '2018 - 2020',
   'بناء مواقع وتطبيقات ويب للشركات الناشئة والمتوسطة.',
   ARRAY['PHP','MySQL','JavaScript'], 3);

-- ── STATS ───────────────────────────────────────────────────────
INSERT INTO stats (label, value, suffix, "order") VALUES
  ('سنوات الخبرة',  6,  '+', 1),
  ('مشروع منجز',   80, '+', 2),
  ('عميل راضٍ',    50, '+', 3),
  ('تقنية مُتقنة', 20, '+', 4);

-- ── SETTINGS ────────────────────────────────────────────────────
INSERT INTO settings (key, value) VALUES
  ('name',     'عمرو خالد الجمل'),
  ('title',    'مطور أنظمة ومواقع بدقة عالية'),
  ('bio',      'مطور متكامل يجمع بين الدقة التقنية والإبداع البصري. أبني تجارب رقمية استثنائية تترك أثراً لا يُنسى.'),
  ('email',    'amro@example.com'),
  ('phone',    '+966 5X XXX XXXX'),
  ('location', 'الرياض، المملكة العربية السعودية'),
  ('github',   'https://github.com/eng-duud'),
  ('linkedin', '#'),
  ('twitter',  '#'),
  ('whatsapp', '#')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
