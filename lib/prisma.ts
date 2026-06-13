import { PrismaClient } from "@prisma/client";

// Singleton Prisma client — avoids exhausting Postgres connections during
// Next.js hot-reload in dev and across serverless invocations.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** True when a database connection string is configured. */
export const isDbConfigured = () => Boolean(process.env.DATABASE_URL);
