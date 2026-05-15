import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  courseId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(4),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json());
    const course = await prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) {
      return NextResponse.json({ ok: false, error: "Course not found" }, { status: 404 });
    }
    const enrollment = await prisma.enrollment.create({
      data: {
        courseId: data.courseId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes || null,
      },
    });
    return NextResponse.json({ ok: true, id: enrollment.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}
