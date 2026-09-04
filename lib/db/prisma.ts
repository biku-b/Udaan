import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

// Persist the Prisma client across hot reloads in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;