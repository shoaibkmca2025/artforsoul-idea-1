import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  location: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  description: z.string().min(1).optional(),
  coverImage: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  featured: z.boolean().optional(),
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
    const updated = await prisma.portfolioItem.update({
      where: { id: params.id },
      data: {
        ...data,
        images: data.images ? JSON.stringify(data.images) : undefined,
      } as any,
    });
    return NextResponse.json({ ok: true, item: updated });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  await prisma.portfolioItem.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
