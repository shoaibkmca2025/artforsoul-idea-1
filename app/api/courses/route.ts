import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().url(),
  price: z.number().int().nonnegative(),
  originalPrice: z.number().int().nonnegative().optional().nullable(),
  duration: z.string().min(1),
  level: z.string().min(1),
  modules: z.array(z.object({ title: z.string(), lessons: z.array(z.string()) })).default([]),
  outcomes: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

async function requireAdmin() {
  const session = await getSession();
  return session.userId ? session : null;
}

export async function GET() {
  const courses = await prisma.course.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, courses });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    const data = createSchema.parse(await req.json());
    let slug = slugify(data.title);
    let n = 1;
    while (await prisma.course.findUnique({ where: { slug } })) {
      slug = `${slugify(data.title)}-${n++}`;
    }
    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug,
        tagline: data.tagline,
        description: data.description,
        coverImage: data.coverImage,
        price: data.price,
        originalPrice: data.originalPrice ?? null,
        duration: data.duration,
        level: data.level,
        modules: JSON.stringify(data.modules),
        outcomes: JSON.stringify(data.outcomes),
        featured: data.featured ?? false,
        published: data.published ?? true,
        order: data.order ?? 0,
      },
    });
    return NextResponse.json({ ok: true, course });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}
