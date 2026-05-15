import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  location: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  description: z.string().min(1),
  coverImage: z.string().url(),
  images: z.array(z.string().url()).default([]),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

async function requireAdmin() {
  const session = await getSession();
  if (!session.userId) return null;
  return session;
}

export async function GET() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    const data = createSchema.parse(await req.json());
    let slug = slugify(data.title);
    let n = 1;
    while (await prisma.portfolioItem.findUnique({ where: { slug } })) {
      slug = `${slugify(data.title)}-${n++}`;
    }
    const item = await prisma.portfolioItem.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        location: data.location || null,
        year: data.year || null,
        description: data.description,
        coverImage: data.coverImage,
        images: JSON.stringify(data.images),
        featured: data.featured ?? false,
        order: data.order ?? 0,
      },
    });
    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}
