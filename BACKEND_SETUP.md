# Art For Soul — Accounts, Payments & Blog setup

The customer accounts + payment + dashboard + blog features are **built and
dormant**. They switch on automatically once you add the keys below. Until
then the site works exactly as before (no login button, "Book & Pay" falls
back to the contact form, all blog posts open).

Stack: **Clerk** (login/signup) · **Supabase Postgres** (database) ·
**Razorpay** (payments).

---

## 1. Database — Supabase (free)

1. Go to https://supabase.com → New project. Pick a strong DB password.
2. Open **Project → Connect → ORMs (Prisma)**.
3. Copy two connection strings into `.env`:
   - **Transaction / pooled** (port `6543`) → `DATABASE_URL`
   - **Session / direct** (port `5432`) → `DIRECT_URL`
4. Create the tables:
   ```bash
   npx prisma migrate dev --name init
   ```
   (For production/Vercel use `npx prisma migrate deploy`.)

You can view bookings anytime in Supabase → **Table Editor → Purchase**.

---

## 2. Login / Signup — Clerk (free)

1. Go to https://clerk.com → create an application (enable Email + Google).
2. **API Keys** → copy into `.env`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (`pk_test_…`)
   - `CLERK_SECRET_KEY` (`sk_test_…`)
3. That's it — the **Login** button, signup/login pages and **My Sessions**
   dashboard appear automatically.

---

## 3. Payments — Razorpay (test first)

1. https://razorpay.com → **Settings → API Keys** → **Generate Test Keys**.
2. Copy into `.env`:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (`rzp_test_…`)
   - `RAZORPAY_KEY_SECRET`
3. Test with Razorpay's test cards (e.g. card `4111 1111 1111 1111`, any
   future expiry, any CVV). No real money moves in test mode.
4. When your Razorpay account is fully activated, swap in the **live** keys
   (`rzp_live_…`) — nothing else changes.

---

## 4. Add the keys to Vercel

Vercel → your project → **Settings → Environment Variables** → add every key
from `.env` (Production + Preview). Then **Redeploy**.

> ⚠️ Never commit `.env` — it's git-ignored. Use `.env.example` as the template.

---

## How it behaves

| Action | Logged out | Logged in |
|--------|-----------|-----------|
| Browse site, About, Sessions, free blog posts | ✅ open | ✅ open |
| **Book & Pay** a session | → sent to login first | → Razorpay checkout → saved to dashboard |
| Open a **Members** blog post | → excerpt + "Log in to read" | ✅ full post |
| **My Sessions** dashboard | → login required | ✅ shows paid sessions |

Login is only ever required for booking and members-only blog posts —
everything else stays open.

---

## Flow of a booking

1. Customer clicks **Book & Pay** on a session → must be signed in.
2. `POST /api/checkout` creates a Razorpay order + a `PENDING` Purchase row.
3. Razorpay checkout opens; on success the client calls
   `POST /api/payment/verify`.
4. The server verifies the Razorpay signature and marks the Purchase `PAID`.
5. The session now shows in the customer's **My Sessions** dashboard.

## Notes

- Blog content currently lives in `lib/blog.ts` (edit posts there). The
  `BlogPost` table exists in the schema for a future admin-managed blog.
- Sessions/prices live in `lib/data.ts`.
- The studio admin area (`/admin`) is still the older prototype and is
  separate from customer accounts.
