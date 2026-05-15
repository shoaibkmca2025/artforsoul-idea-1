import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  tagline: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  coverImage: z.string().url().optional(),
  price: z.number().int().nonnegative().optional(),
  originalPrice: z.number().int().nonnegative().optional().nullable(),
  duration: z.string().min(1).optional(),
  level: z.string().min(1).optional(),
  modules: z.array(z.object({ title: z.string(), lessons: z.array(z.string()) })).optional(),
  outcomes: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

async function requireAdmin() {
  const session = await getSession();
  return session.userId ? session : null;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    const data = updateSchema.parse(await req.json());
    const updated = await prisma.course.update({
      where: { id: params.id },
      data: {
        ...data,
        modules: data.modules ? JSON.stringify(data.modules) : undefined,
        outcomes: data.outcomes ? JSON.stringify(data.outcomes) : undefined,
      } as any,
    });
    return NextResponse.json({ ok: true, course: updated });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  await prisma.course.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
