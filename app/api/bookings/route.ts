import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(4),
  service: z.string().min(1),
  date: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json());
    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date || null,
        message: data.message || null,
      },
    });
    return NextResponse.json({ ok: true, id: booking.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}
