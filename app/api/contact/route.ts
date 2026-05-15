import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  subject: z.string().max(160).optional().nullable(),
  message: z.string().min(3).max(4000),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = schema.parse(data);
    const message = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        subject: parsed.subject || "",
        message: parsed.message,
      },
    });
    return NextResponse.json({ ok: true, id: message.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}
