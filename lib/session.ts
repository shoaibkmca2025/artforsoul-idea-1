import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "afs_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// A dev fallback keeps things working locally; set a strong SESSION_SECRET
// (32+ chars) in production / Vercel.
const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || "art-for-soul-dev-secret-change-me-please-32+"
);

export type SessionUser = { id: string; email: string; name?: string | null };

export async function signSession(user: SessionUser): Promise<string> {
  return await new SignJWT({ email: user.email, name: user.name ?? null })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      email: String(payload.email ?? ""),
      name: (payload.name as string | null) ?? null,
    };
  } catch {
    return null;
  }
}

/** Read the signed-in user from the cookie (server components / routes). */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE,
};
