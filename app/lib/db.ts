import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// ─── typed query helpers ────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getProjects(opts?: { featured?: boolean; hidden?: boolean }) {
  return prisma.project.findMany({
    where: {
      ...(opts?.featured !== undefined ? { featured: opts.featured } : {}),
      ...(opts?.hidden !== undefined ? { hidden: opts.hidden } : {}),
    },
    include: {
      category: true,
      tech: true,
      images: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      category: true,
      tech: true,
      images: true,
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      category: true,
      tech: true,
      images: true,
    },
  });
}
