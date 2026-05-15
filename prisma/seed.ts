import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@artforsoul.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "ArtForSoul@123";
  const hash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hash },
    create: { email: adminEmail, password: hash, name: "Art For Soul Admin" },
  });

  // Portfolio (interior design work)
  const portfolio = [
    {
      title: "Serene Boho Living Room",
      slug: "serene-boho-living",
      category: "Living Room",
      location: "Mumbai",
      year: "2025",
      description:
        "A warm bohemian living space layered with handwoven textures, terracotta tones and curated artisan pieces that breathe calm into every corner.",
      coverImage:
        "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
        "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80",
      ]),
      featured: true,
      order: 1,
    },
    {
      title: "Soft Pastel Bedroom Retreat",
      slug: "pastel-bedroom-retreat",
      category: "Bedroom",
      location: "Pune",
      year: "2025",
      description:
        "Dusty pinks, oat linens and gentle archways create a bedroom that wraps you in a long exhale the moment you step in.",
      coverImage:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
      ]),
      featured: true,
      order: 2,
    },
    {
      title: "Earthy Kitchen Story",
      slug: "earthy-kitchen-story",
      category: "Kitchen",
      location: "Bengaluru",
      year: "2024",
      description:
        "Stoneware, oak wood and sage greens come together in a kitchen designed for slow mornings and longer conversations.",
      coverImage:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
        "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&q=80",
      ]),
      featured: true,
      order: 3,
    },
    {
      title: "Sunlit Reading Nook",
      slug: "sunlit-reading-nook",
      category: "Living Room",
      location: "Goa",
      year: "2024",
      description:
        "A south-facing corner reimagined as a layered reading sanctuary with vintage rugs and hand-painted ceramic accents.",
      coverImage:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1200&q=80",
      ]),
      order: 4,
    },
    {
      title: "Creative Studio Workspace",
      slug: "creative-studio-workspace",
      category: "Office",
      location: "Delhi",
      year: "2024",
      description:
        "A bright, plant-filled studio that doubles as a workshop space. Modular shelving and warm task-lighting designed for creators.",
      coverImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=80",
      ]),
      order: 5,
    },
    {
      title: "Whispering Earth Cafe",
      slug: "whispering-earth-cafe",
      category: "Commercial",
      location: "Jaipur",
      year: "2025",
      description:
        "A cafe interior wrapped in mud plaster, jute and brass — every surface tells a slow, handmade story.",
      coverImage:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80",
      ]),
      featured: true,
      order: 6,
    },
  ];

  for (const p of portfolio) {
    await prisma.portfolioItem.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // Courses
  const courses = [
    {
      title: "Art Therapy for Beginners",
      slug: "art-therapy-beginners",
      tagline: "Heal through color, line and presence",
      description:
        "A 6-week gentle introduction to art therapy. Discover how simple creative practices can soothe anxiety, unlock emotion and bring you back to yourself — no art experience required.",
      coverImage:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
      price: 4999,
      originalPrice: 7999,
      duration: "6 weeks",
      level: "Beginner",
      modules: JSON.stringify([
        { title: "Week 1 — Meeting the Page", lessons: ["Mindful mark making", "Breath & brushstroke", "Setting your safe space"] },
        { title: "Week 2 — Color as Emotion", lessons: ["The mood-color map", "Watercolor as feeling", "Journaling with color"] },
        { title: "Week 3 — Soft Self Portraits", lessons: ["Drawing without judgement", "Inner-child sketching"] },
        { title: "Week 4 — Healing the Body", lessons: ["Somatic doodles", "Tension release through line"] },
        { title: "Week 5 — Affirmation Art", lessons: ["Letterforms as ritual", "Designing daily affirmations"] },
        { title: "Week 6 — Your Healing Journal", lessons: ["Binding your journal", "A 30-day prompt set"] },
      ]),
      outcomes: JSON.stringify([
        "A daily 10-minute art-therapy ritual",
        "A finished healing journal",
        "A toolkit of 30+ creative prompts",
        "Lifetime access to recordings",
      ]),
      featured: true,
      order: 1,
    },
    {
      title: "Emotional Healing Through Watercolor",
      slug: "emotional-watercolor",
      tagline: "Soft pigments, soft hearts",
      description:
        "An immersive watercolor experience for emotional release. Learn to flow with water, surrender to color and create work that holds your feelings tenderly.",
      coverImage:
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=80",
      price: 3499,
      originalPrice: 4999,
      duration: "4 weeks",
      level: "Beginner",
      modules: JSON.stringify([
        { title: "Foundations", lessons: ["Pigments & paper", "Wet on wet", "Wet on dry"] },
        { title: "Mood Palettes", lessons: ["Designing a feeling", "Pastels & lavenders"] },
        { title: "Healing Compositions", lessons: ["Florals as feelings", "Skies as breath"] },
        { title: "Your Series", lessons: ["A four-piece emotional series"] },
      ]),
      outcomes: JSON.stringify([
        "Confidence with watercolor basics",
        "A four-piece personal art series",
        "Live feedback sessions",
      ]),
      featured: true,
      order: 2,
    },
    {
      title: "The Creative Wellness Journal",
      slug: "creative-wellness-journal",
      tagline: "Daily pages for a softer mind",
      description:
        "A self-paced journaling course that combines collage, sketching and writing into a tender daily practice for the overstimulated soul.",
      coverImage:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
      price: 1999,
      originalPrice: 2999,
      duration: "Self-paced",
      level: "All levels",
      modules: JSON.stringify([
        { title: "Set the Tone", lessons: ["Choosing your journal", "Building a nightly ritual"] },
        { title: "The Six Spreads", lessons: ["Gratitude spread", "Anxiety release spread", "Inner-child spread", "Future-self spread", "Body kindness spread", "Free play spread"] },
      ]),
      outcomes: JSON.stringify([
        "30 guided journaling prompts",
        "Printable collage kit",
        "Lifetime access",
      ]),
      order: 3,
    },
    {
      title: "Interior Styling Masterclass",
      slug: "interior-styling-masterclass",
      tagline: "Design rooms that hold you",
      description:
        "A masterclass for home lovers and aspiring designers. Learn to style emotionally resonant interiors using texture, tone and storytelling — taught by a working interior designer.",
      coverImage:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      price: 6999,
      originalPrice: 9999,
      duration: "8 weeks",
      level: "Intermediate",
      modules: JSON.stringify([
        { title: "Foundations of Emotional Design", lessons: ["Mood-first design thinking", "Reading a room"] },
        { title: "Color & Texture Stories", lessons: ["Warm neutrals", "Layering textiles", "Lighting as language"] },
        { title: "Sourcing With Soul", lessons: ["Working with artisans", "Vintage & second-hand"] },
        { title: "Putting It Together", lessons: ["Styling a full room", "Photographing your work"] },
      ]),
      outcomes: JSON.stringify([
        "A complete styled-room project",
        "Vendor & artisan list",
        "Personal mentorship slots",
      ]),
      featured: true,
      order: 4,
    },
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  // Testimonials
  const testimonials = [
    {
      name: "Aanya R.",
      role: "Art Therapy Student",
      quote:
        "I came in burned out and left holding my own little healing journal. The course felt like a long warm hug.",
      rating: 5,
      order: 1,
    },
    {
      name: "Rhea M.",
      role: "Workshop Participant",
      quote:
        "It is the first space where I have painted without judging myself. I cried, laughed and finally exhaled.",
      rating: 5,
      order: 2,
    },
    {
      name: "Kavya S.",
      role: "Interior Design Client",
      quote:
        "She didn't just design my home, she translated my feelings into a space. Every corner feels like me.",
      rating: 5,
      order: 3,
    },
    {
      name: "Meera P.",
      role: "1:1 Session",
      quote:
        "After three sessions I started sleeping again. There is real medicine in what she does.",
      rating: 5,
      order: 4,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }

  // Gallery
  const gallery = [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=80",
    "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=900&q=80",
    "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80",
    "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=900&q=80",
    "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=80",
  ];

  for (let i = 0; i < gallery.length; i++) {
    const existing = await prisma.galleryItem.findFirst({ where: { image: gallery[i] } });
    if (!existing) {
      await prisma.galleryItem.create({
        data: { image: gallery[i], category: i % 3 === 0 ? "art" : i % 3 === 1 ? "journal" : "affirmation", order: i },
      });
    }
  }

  console.log("✨ Seeded Art For Soul database");
  console.log(`   Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
