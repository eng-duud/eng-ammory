"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var projectsData, _i, projectsData_1, project, skillsData, _a, skillsData_1, skill, experiencesData, _b, experiencesData_1, experience, statsData, _c, statsData_1, stat, settingsData, _d, settingsData_1, setting;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: 
                // Categories
                return [4 /*yield*/, prisma.category.upsert({
                        where: { slug: 'fullstack' },
                        update: {},
                        create: { id: 'cat_fs', name: 'Full-Stack', slug: 'fullstack', order: 1 },
                    })];
                case 1:
                    // Categories
                    _e.sent();
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'frontend' },
                            update: {},
                            create: { id: 'cat_fe', name: 'Frontend', slug: 'frontend', order: 2 },
                        })];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: 'mobile' },
                            update: {},
                            create: { id: 'cat_mob', name: 'Mobile', slug: 'mobile', order: 3 },
                        })];
                case 3:
                    _e.sent();
                    projectsData = [
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
                    _i = 0, projectsData_1 = projectsData;
                    _e.label = 4;
                case 4:
                    if (!(_i < projectsData_1.length)) return [3 /*break*/, 7];
                    project = projectsData_1[_i];
                    return [4 /*yield*/, prisma.project.upsert({
                            where: { slug: project.slug },
                            update: {},
                            create: project,
                        })];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: 
                // Skill Groups
                return [4 /*yield*/, prisma.skillGroup.upsert({
                        where: { slug: 'frontend' },
                        update: {},
                        create: { id: 'sg_fe', name: 'Frontend', slug: 'frontend', order: 1 },
                    })];
                case 8:
                    // Skill Groups
                    _e.sent();
                    return [4 /*yield*/, prisma.skillGroup.upsert({
                            where: { slug: 'backend' },
                            update: {},
                            create: { id: 'sg_be', name: 'Backend', slug: 'backend', order: 2 },
                        })];
                case 9:
                    _e.sent();
                    return [4 /*yield*/, prisma.skillGroup.upsert({
                            where: { slug: 'devops' },
                            update: {},
                            create: { id: 'sg_devops', name: 'DevOps', slug: 'devops', order: 3 },
                        })];
                case 10:
                    _e.sent();
                    return [4 /*yield*/, prisma.skillGroup.upsert({
                            where: { slug: 'design' },
                            update: {},
                            create: { id: 'sg_design', name: 'Design', slug: 'design', order: 4 },
                        })];
                case 11:
                    _e.sent();
                    skillsData = [
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
                    _a = 0, skillsData_1 = skillsData;
                    _e.label = 12;
                case 12:
                    if (!(_a < skillsData_1.length)) return [3 /*break*/, 15];
                    skill = skillsData_1[_a];
                    return [4 /*yield*/, prisma.skill.create({
                            data: skill,
                        })];
                case 13:
                    _e.sent();
                    _e.label = 14;
                case 14:
                    _a++;
                    return [3 /*break*/, 12];
                case 15:
                    experiencesData = [
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
                    _b = 0, experiencesData_1 = experiencesData;
                    _e.label = 16;
                case 16:
                    if (!(_b < experiencesData_1.length)) return [3 /*break*/, 19];
                    experience = experiencesData_1[_b];
                    return [4 /*yield*/, prisma.experience.create({
                            data: experience,
                        })];
                case 17:
                    _e.sent();
                    _e.label = 18;
                case 18:
                    _b++;
                    return [3 /*break*/, 16];
                case 19:
                    statsData = [
                        { label: 'سنوات الخبرة', value: 6, suffix: '+', order: 1 },
                        { label: 'مشروع منجز', value: 80, suffix: '+', order: 2 },
                        { label: 'عميل راضٍ', value: 50, suffix: '+', order: 3 },
                        { label: 'تقنية مُتقنة', value: 20, suffix: '+', order: 4 },
                    ];
                    _c = 0, statsData_1 = statsData;
                    _e.label = 20;
                case 20:
                    if (!(_c < statsData_1.length)) return [3 /*break*/, 23];
                    stat = statsData_1[_c];
                    return [4 /*yield*/, prisma.stat.create({
                            data: stat,
                        })];
                case 21:
                    _e.sent();
                    _e.label = 22;
                case 22:
                    _c++;
                    return [3 /*break*/, 20];
                case 23:
                    settingsData = [
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
                    ];
                    _d = 0, settingsData_1 = settingsData;
                    _e.label = 24;
                case 24:
                    if (!(_d < settingsData_1.length)) return [3 /*break*/, 27];
                    setting = settingsData_1[_d];
                    return [4 /*yield*/, prisma.setting.upsert({
                            where: { key: setting.key },
                            update: { value: setting.value },
                            create: setting,
                        })];
                case 25:
                    _e.sent();
                    _e.label = 26;
                case 26:
                    _d++;
                    return [3 /*break*/, 24];
                case 27:
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
