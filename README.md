# Art For Soul · Creative Healing Studio

A fully animated, multi-page Next.js website for *Art For Soul* — a creative
healing studio offering art therapy, soulful interior design and online
courses.

## What is built

**Public pages** — all with scroll-based Framer Motion animations and Lenis
smooth scroll:

- `/` — Hero, marquee affirmations, About, Services, Benefits, Interior
  portfolio preview, Courses preview, gallery strip, Testimonials, CTA
- `/about` — Story, values, timeline
- `/services` — 1:1 sessions, workshops, healing programs, creative wellness,
  interior design
- `/portfolio` — Interior design work with category filter + lightbox detail
- `/courses` — Course listing
- `/courses/[slug]` — Course detail with syllabus and enrollment form
- `/gallery` — Masonry gallery wall with category filter + lightbox
- `/contact` — Contact form, booking form, WhatsApp/Instagram/email

**Admin panel** (`/admin`) — for the client to manage everything herself:

- `/admin/login` — Email/password sign-in (iron-session cookie)
- `/admin` — Stats dashboard + recent activity
- `/admin/portfolio` — Create / feature / delete interior projects
  with image uploads
- `/admin/courses` — Create / publish / feature / delete courses,
  including modules + outcomes + image uploads, and a roster of
  enrolled students per course
- `/admin/bookings` — All booking requests
- `/admin/messages` — All contact-form messages

**Backend** (Next.js API routes + Prisma + SQLite):

- `POST /api/contact` — Save contact messages
- `POST /api/bookings` — Save session booking requests
- `POST /api/enrollments` — Save course enrollments
- `POST /api/auth/login` / `DELETE` — Admin login / logout (iron-session)
- `GET/POST/PATCH/DELETE /api/portfolio[/:id]` — Portfolio CRUD (auth required)
- `GET/POST/PATCH/DELETE /api/courses[/:id]` — Courses CRUD (auth required)
- `POST /api/upload` — Image uploads to `/public/uploads` (auth required)

## Quick start

```bash
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Open <http://localhost:3000>.

### Admin login

The seed creates a default admin:

- **Email:** `admin@artforsoul.in`
- **Password:** `ArtForSoul@123`

Both come from `.env` — change `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`SESSION_PASSWORD` and the WhatsApp/Instagram envs before deploying.

## Tech

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** with a custom brand palette (cream, rose, earth, sage,
  lavender) + paper-grain and watercolor-blob layers in `globals.css`
- **Framer Motion** for component, layout and scroll animations
- **Lenis** for buttery smooth scroll
- **GSAP** is wired up via the import (kept for future advanced
  ScrollTrigger work)
- **Prisma + SQLite** — file-based, no Docker, runs anywhere
- **iron-session** for cookie-based admin auth
- **Zod** for API validation
- **Sonner** for toasts
- **Lucide** icons
- **Next/Font** — Caveat (script), Cormorant Garamond (display), Quicksand
  (body), Dancing Script (accent)

## Project structure

```
app/
  layout.tsx              Root layout with smooth scroll + global doodles
  page.tsx                Home page (assembles all sections)
  about/                  About page
  services/               Services page
  portfolio/              Interior portfolio + lightbox
  courses/                Courses index + [slug] detail
  gallery/                Masonry gallery
  contact/                Contact + booking forms
  admin/                  Admin panel (login + dashboard + CRUD pages)
  api/                    Server routes (contact, bookings, enrollments,
                          portfolio/courses CRUD, login, upload)
components/
  layout/                 Navigation + Footer
  animations/             SmoothScrollProvider, ScrollReveal, Parallax,
                          TextReveal, FloatingDoodles, ScrollProgress
  home/                   Hero, About, Services, Benefits, PortfolioPreview,
                          CoursesPreview, GalleryStrip, Testimonials,
                          AffirmationMarquee, CTASection
  ui/                     PageHero
lib/
  prisma.ts               Prisma singleton
  session.ts              iron-session config
  utils.ts                cn(), slugify(), formatINR(), safeJson()
prisma/
  schema.prisma           Data model
  seed.ts                 Seed admin + sample portfolio/courses/testimonials/gallery
public/
  uploads/                Image uploads land here (created at runtime)
```

## Notes

- Image uploads are saved locally to `public/uploads`. For deployment to a
  serverless host (Vercel) you should swap this to S3/Cloudinary.
- The `.env` file ships with development defaults — change `SESSION_PASSWORD`
  to a strong 32+ char secret before production.
- The site uses Unsplash placeholder images in the seed. Replace them via the
  admin panel.
