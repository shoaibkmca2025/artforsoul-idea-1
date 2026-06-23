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

/** True when a real database connection string is configured
 *  (i.e. the placeholder password has been replaced). */
export const isDbConfigured = () => {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  // Still the template? Treat as not configured so the app degrades gracefully.
  if (
    url.includes("[YOUR-PASSWORD]") ||
    url.includes("YOUR-PASSWORD") ||
    url.includes(":PASSWORD@") ||
    url.includes("postgres.xxxx")
  ) {
    return false;
  }
  return true;
};
