import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
};

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_PASSWORD ||
    "please-change-this-to-a-32-plus-character-secret-passphrase-art-for-soul-2025",
  cookieName: "afs_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  },
};

export async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}
