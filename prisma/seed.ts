import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Categories
  await prisma.category.upsert({
    where: { slug: 'fullstack' },
    update: {},
    create: { id: 'cat_fs', name: 'Full-Stack', slug: 'fullstack', order: 1 },
  });
  await prisma.category.upsert({
    where: { slug: 'frontend' },
    update: {},
    create: { id: 'cat_fe', name: 'Frontend', slug: 'frontend', order: 2 },
  });
  await prisma.category.upsert({
    where: { slug: 'mobile' },
    update: {},
    create: { id: 'cat_mob', name: 'Mobile', slug: 'mobile', order: 3 },
  });

  // Projects
  const projectsData = [
    {
      id: 'proj_1', title: 'نظام إدارة المستشفيات', titleEn: 'Hospital Management System', slug: 'hospital-management',
      description: 'منصة متكاملة لإدارة المستشفيات تشمل إدارة المرضى والمواعيد والفواتير والموارد البشرية.',
      descriptionLong: 'نظام شامل يخدم أكثر من 15 مستشفى وعيادة، يوفر إدارة كاملة للعمليات الطبية والإدارية. يتضمن نظام تسجيل المرضى، جدولة الأطباء، إدارة الأسرّة، الفواتير الإلكترونية، والتقارير التحليلية المتقدمة.',
      categoryId: 'cat_fs', liveUrl: '#', githubUrl: '#', featured: true, hidden: false, order: 1, color: '#1a3a5c', accent: '#4a9eff', year: '2024',
      tech: { create: [{ name: 'Next.js' }, { name: 'Laravel' }, { name: 'PostgreSQL' }, { name: 'Redis' }, { name: 'Docker' }, { name: 'AWS' }] }
    },
    {
      id: 'proj_2', title: 'منصة التجارة الإلكترونية', titleEn: 'E-Commerce Platform', slug: 'ecommerce-platform',
      description: 'منصة تسوق إلكتروني متعددة البائعين مع نظام دفع متكامل.',
      descriptionLong: 'منصة تجارة إلكترونية متكاملة تدعم المتاجر المتعددة، مع بوابة دفع آمنة، نظام تتبع الطلبات، لوحة تحكم البائع، وتطبيق جوال للمشترين.',
      categoryId: 'cat_fs', liveUrl: '#', githubUrl: '#', featured: true, hidden: false, order: 2, color: '#2d1a4a', accent: '#9b59b6', year: '2024',
      tech: { create: [{ name: 'React' }, { name: 'Node.js' }, { name: 'MongoDB' }, { name: 'Stripe' }, { name: 'Redis' }, { name: 'Tailwind' }] }
    },
    {
      id: 'proj_3', title: 'تطبيق إدارة المشاريع', titleEn: 'Project Management App', slug: 'project-management',
      description: 'تطبيق ويب لإدارة المشاريع والفرق بتصميم متحرك ومميز.',
      descriptionLong: 'أداة إدارة مشاريع ذكية تجمع بين Kanban Board، تتبع الوقت، إدارة المهام، التعاون الفوري، والتقارير التحليلية.',
      categoryId: 'cat_fe', liveUrl: '#', githubUrl: '#', featured: true, hidden: false, order: 3, color: '#1a3a1a', accent: '#2ecc71', year: '2023',
      tech: { create: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'GraphQL' }, { name: 'Tailwind' }, { name: 'Framer Motion' }] }
    },
    {
      id: 'proj_4', title: 'بوابة التعليم الذكي', titleEn: 'Smart Learning Portal', slug: 'smart-learning',
      description: 'منصة تعليمية تفاعلية بالذكاء الاصطناعي لشخصنة تجربة التعلم.',
      descriptionLong: 'منصة تعليمية متطورة تستخدم الذكاء الاصطناعي لتحليل أسلوب تعلم كل طالب وتقديم محتوى مخصص.',
      categoryId: 'cat_fs', liveUrl: '#', githubUrl: '#', featured: false, hidden: false, order: 4, color: '#3a1a1a', accent: '#e74c3c', year: '2023',
      tech: { create: [{ name: 'Next.js' }, { name: 'Python' }, { name: 'FastAPI' }, { name: 'PostgreSQL' }, { name: 'OpenAI' }] }
    },
    {
      id: 'proj_5', title: 'نظام المطاعم الذكي', titleEn: 'Smart Restaurant System', slug: 'smart-restaurant',
      description: 'تطبيق إدارة مطاعم متكامل مع QR Code وطلبات فورية.',
      descriptionLong: 'نظام شامل يتيح للزبائن طلب الطعام عبر QR Code، يدير الطلبات والمطبخ بشكل فوري.',
      categoryId: 'cat_mob', liveUrl: '#', githubUrl: '#', featured: false, hidden: false, order: 5, color: '#3a2a1a', accent: '#e67e22', year: '2023',
      tech: { create: [{ name: 'Flutter' }, { name: 'Laravel' }, { name: 'MySQL' }, { name: 'Firebase' }] }
    },
    {
      id: 'proj_6', title: 'لوحة تحكم تحليلية', titleEn: 'Analytics Dashboard', slug: 'analytics-dashboard',
      description: 'لوحة بيانات تحليلية متقدمة بتصورات بيانية تفاعلية.',
      descriptionLong: 'لوحة تحكم بيانات ضخمة مع أكثر من 50 نوع مخطط، تحديث في الوقت الفعلي، تصدير التقارير.',
      categoryId: 'cat_fe', liveUrl: '#', githubUrl: '#', featured: false, hidden: false, order: 6, color: '#1a2a3a', accent: '#3498db', year: '2022',
      tech: { create: [{ name: 'React' }, { name: 'D3.js' }, { name: 'TypeScript' }, { name: 'WebSocket' }] }
    },
  ];

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  // Skill Groups
  await prisma.skillGroup.upsert({
    where: { slug: 'frontend' },
    update: {},
    create: { id: 'sg_fe', name: 'Frontend', slug: 'frontend', order: 1 },
  });
  await prisma.skillGroup.upsert({
    where: { slug: 'backend' },
    update: {},
    create: { id: 'sg_be', name: 'Backend', slug: 'backend', order: 2 },
  });
  await prisma.skillGroup.upsert({
    where: { slug: 'devops' },
    update: {},
    create: { id: 'sg_devops', name: 'DevOps', slug: 'devops', order: 3 },
  });
  await prisma.skillGroup.upsert({
    where: { slug: 'design' },
    update: {},
    create: { id: 'sg_design', name: 'Design', slug: 'design', order: 4 },
  });

  // Skills
  const skillsData = [
    { name: 'React / Next.js', level: 95, order: 1, groupId: 'sg_fe' },
    { name: 'TypeScript', level: 92, order: 2, groupId: 'sg_fe' },
    { name: 'Three.js', level: 75, order: 3, groupId: 'sg_fe' },
    { name: 'Tailwind CSS', level: 95, order: 4, groupId: 'sg_fe' },
    { name: 'Node.js', level: 88, order: 1, groupId: 'sg_be' },
    { name: 'Laravel / PHP', level: 85, order: 2, groupId: 'sg_be' },
    { name: 'PostgreSQL', level: 82, order: 3, groupId: 'sg_be' },
    { name: 'MongoDB', level: 80, order: 4, groupId: 'sg_be' },
    { name: 'GraphQL', level: 80, order: 5, groupId: 'sg_be' },
    { name: 'Python', level: 70, order: 6, groupId: 'sg_be' },
    { name: 'Redis', level: 75, order: 7, groupId: 'sg_be' },
    { name: 'Docker', level: 78, order: 1, groupId: 'sg_devops' },
    { name: 'AWS', level: 72, order: 2, groupId: 'sg_devops' },
    { name: 'Git / CI-CD', level: 90, order: 3, groupId: 'sg_devops' },
    { name: 'Figma', level: 85, order: 1, groupId: 'sg_design' },
    { name: 'Flutter', level: 68, order: 1, groupId: 'sg_fe' },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({
      data: skill,
    });
  }

  // Experiences
  const experiencesData = [
    {
      role: 'مطور Full-Stack أول', company: 'شركة تقنية رائدة', period: '2022 - الحاضر',
      description: 'قيادة فريق من 5 مطورين لبناء منصات تقنية متكاملة لعملاء دوليين.',
      tech: ['Next.js', 'Laravel', 'AWS'], order: 1
    },
    {
      role: 'مطور Frontend متقدم', company: 'وكالة تصميم رقمي', period: '2020 - 2022',
      description: 'تطوير واجهات مستخدم تفاعلية لأكثر من 30 مشروع متنوع.',
      tech: ['React', 'TypeScript', 'Figma'], order: 2
    },
    {
      role: 'مطور ويب', company: 'شركة ناشئة', period: '2018 - 2020',
      description: 'بناء مواقع وتطبيقات ويب للشركات الناشئة والمتوسطة.',
      tech: ['PHP', 'MySQL', 'JavaScript'], order: 3
    },
  ];

  for (const experience of experiencesData) {
    await prisma.experience.create({
      data: experience,
    });
  }

  // Stats
  const statsData = [
    { label: 'سنوات الخبرة', value: 6, suffix: '+', order: 1 },
    { label: 'مشروع منجز', value: 80, suffix: '+', order: 2 },
    { label: 'عميل راضٍ', value: 50, suffix: '+', order: 3 },
    { label: 'تقنية مُتقنة', value: 20, suffix: '+', order: 4 },
  ];

  for (const stat of statsData) {
    await prisma.stat.create({
      data: stat,
    });
  }

  // Settings
  const settingsData = [
    { key: 'name', value: 'عمرو خالد الجمل' },
    { key: 'title', value: 'مطور أنظمة ومواقع بدقة عالية' },
    { key: 'bio', value: 'مطور متكامل يجمع بين الدقة التقنية والإبداع البصري. أبني تجارب رقمية استثنائية تترك أثراً لا يُنسى.' },
    { key: 'email', value: 'amro@example.com' },
    { key: 'phone', value: '+966 5X XXX XXXX' },
    { key: 'location', value: 'الرياض، المملكة العربية السعودية' },
    { key: 'github', value: 'https://github.com/eng-duud' },
    { key: 'linkedin', value: '#' },
    { key: 'twitter', value: '#' },
    { key: 'whatsapp', value: '#' },
    { key: 'profileImage', value: '' },
    { key: 'cvUrl', value: '' },
  ];

  for (const setting of settingsData) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
