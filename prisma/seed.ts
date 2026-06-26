import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.projectTech.deleteMany({});
  await prisma.projectImage.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.skillGroup.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.stat.deleteMany({});
  await prisma.setting.deleteMany({});
  await prisma.message.deleteMany({});

  console.log('Seeding categories...');
  await prisma.category.createMany({
    data: [
      { id: 'cat_fs', name: 'Full-Stack', slug: 'fullstack', order: 1 },
      { id: 'cat_fe', name: 'Frontend', slug: 'frontend', order: 2 },
      { id: 'cat_mob', name: 'Mobile', slug: 'mobile', order: 3 },
    ]
  });

  console.log('Seeding projects...');
  const projects = [
    {
      id: 'proj_1', title: 'نظام إدارة المستشفيات', titleEn: 'Hospital Management System', slug: 'hospital-management',
      description: 'منصة متكاملة لإدارة المستشفيات تشمل إدارة المرضى والمواعيد والفواتير والموارد البشرية.',
      descriptionLong: 'نظام شامل يخدم أكثر من 15 مستشفى وعيادة، يوفر إدارة كاملة للعمليات الطبية والإدارية. يتضمن نظام تسجيل المرضى، جدولة الأطباء، إدارة الأسرّة، الفواتير الإلكترونية، والتقارير التحليلية المتقدمة.',
      categoryId: 'cat_fs', liveUrl: 'https://example.com', githubUrl: 'https://github.com/eng-duud', featured: true, hidden: false, order: 1, color: '#1a3a5c', accent: '#4a9eff', year: '2024',
    },
    {
      id: 'proj_2', title: 'منصة التجارة الإلكترونية', titleEn: 'E-Commerce Platform', slug: 'ecommerce-platform',
      description: 'منصة تسوق إلكتروني متعددة البائعين مع نظام دفع متكامل.',
      descriptionLong: 'منصة تجارة إلكترونية متكاملة تدعم المتاجر المتعددة، مع بوابة دفع آمنة، نظام تتبع الطلبات، لوحة تحكم البائع، وتطبيق جوال للمشترين.',
      categoryId: 'cat_fs', liveUrl: 'https://example.com', githubUrl: 'https://github.com/eng-duud', featured: true, hidden: false, order: 2, color: '#2d1a4a', accent: '#9b59b6', year: '2024',
    },
    {
      id: 'proj_3', title: 'تطبيق إدارة المشاريع', titleEn: 'Project Management App', slug: 'project-management',
      description: 'تطبيق ويب لإدارة المشاريع والفرق بتصميم متحرك ومميز.',
      descriptionLong: 'أداة إدارة مشاريع ذكية تجمع بين Kanban Board، تتبع الوقت، إدارة المهام، التعاون الفوري، والتقارير التحليلية.',
      categoryId: 'cat_fe', liveUrl: 'https://example.com', githubUrl: 'https://github.com/eng-duud', featured: true, hidden: false, order: 3, color: '#1a3a1a', accent: '#2ecc71', year: '2023',
    }
  ];

  for (const p of projects) {
    await prisma.project.create({
      data: {
        ...p,
        tech: {
          create: [
            { name: 'Next.js' }, { name: 'React' }, { name: 'TypeScript' }, { name: 'Tailwind' }
          ]
        }
      }
    });
  }

  console.log('Seeding skill groups...');
  await prisma.skillGroup.createMany({
    data: [
      { id: 'sg_fe', name: 'Frontend', slug: 'frontend', order: 1 },
      { id: 'sg_be', name: 'Backend', slug: 'backend', order: 2 },
      { id: 'sg_devops', name: 'DevOps', slug: 'devops', order: 3 },
      { id: 'sg_design', name: 'Design', slug: 'design', order: 4 },
    ]
  });

  console.log('Seeding skills...');
  await prisma.skill.createMany({
    data: [
      { name: 'React / Next.js', level: 95, order: 1, groupId: 'sg_fe' },
      { name: 'TypeScript', level: 92, order: 2, groupId: 'sg_fe' },
      { name: 'Node.js', level: 88, order: 1, groupId: 'sg_be' },
      { name: 'Laravel / PHP', level: 85, order: 2, groupId: 'sg_be' },
      { name: 'PostgreSQL', level: 82, order: 3, groupId: 'sg_be' },
      { name: 'Docker', level: 78, order: 1, groupId: 'sg_devops' },
      { name: 'Figma', level: 85, order: 1, groupId: 'sg_design' },
    ]
  });

  console.log('Seeding stats...');
  await prisma.stat.createMany({
    data: [
      { label: 'سنوات الخبرة', value: 6, suffix: '+', order: 1 },
      { label: 'مشروع منجز', value: 80, suffix: '+', order: 2 },
      { label: 'عميل راضٍ', value: 50, suffix: '+', order: 3 },
      { label: 'تقنية مُتقنة', value: 20, suffix: '+', order: 4 },
    ]
  });

  console.log('Seeding settings...');
  await prisma.setting.createMany({
    data: [
      { key: 'name', value: 'عمرو خالد الجمل' },
      { key: 'title', value: 'مطور أنظمة ومواقع بدقة عالية' },
      { key: 'bio', value: 'مطور متكامل يجمع بين الدقة التقنية والإبداع البصري. أبني تجارب رقمية استثنائية تترك أثراً لا يُنسى.' },
      { key: 'email', value: 'amro@example.com' },
      { key: 'phone', value: '+966 5X XXX XXXX' },
      { key: 'location', value: 'الرياض، المملكة العربية السعودية' },
      { key: 'github', value: 'https://github.com/eng-duud' },
      { key: 'profileImage', value: 'https://res.cloudinary.com/drpxnstqh/image/upload/v1782488287/hdtnuvscvnv8kgaksmnl.png' },
      { key: 'cvUrl', value: '' },
    ]
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
