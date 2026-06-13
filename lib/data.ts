// ─── Static data for the live site ───

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  year: string | null;
  description: string;
  coverImage: string;
  images: string; // JSON-encoded string array
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice: number | null;
  priceUnit?: string; // e.g. "per session" (default) or "full program"
  duration: string;
  level: string;
  modules: string; // JSON-encoded
  outcomes: string; // JSON-encoded
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  image: string | null;
  order: number;
  createdAt: Date;
};

// ─── Workshops & Events — photos from past / offline sessions ───
// To add a real photo: drop the image in /public/images/ and set
// `image: "/images/your-photo.jpg"`. Edit title / location / date freely.
export type EventPhoto = {
  id: string;
  title: string;
  location: string | null;
  date: string | null; // free text e.g. "Mar 2025"
  image: string;
};

// ─── Healing Moments — a softer gallery of art & healing imagery ───
// Add real photos by dropping them in /public/images/ and listing the path.
export const healingMoments: string[] = [
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=70",
  "https://images.unsplash.com/photo-1517637382994-f02da38c6728?w=800&q=70",
  "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=70",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=70",
  "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=70",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=70",
  "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=70",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=70",
];

// Upcoming / registerable workshops (shown on the gated /workshops page).
export type UpcomingWorkshop = {
  id: string;
  title: string;
  format: string; // e.g. "Half-Day Workshop"
  mode: string; // "Online" | "In-person · Mumbai"
  when: string; // free text e.g. "Coming soon"
  image: string;
};

export const upcomingWorkshops: UpcomingWorkshop[] = [
  {
    id: "u1",
    title: "Art Therapy Healing Circle",
    format: "Half-Day Workshop",
    mode: "Online",
    when: "Dates announced soon",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
  },
  {
    id: "u2",
    title: "Women's Wellness Retreat",
    format: "1-Day Retreat",
    mode: "In-person · Mumbai",
    when: "Dates announced soon",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&q=70",
  },
  {
    id: "u3",
    title: "Sound Healing & Meditation Circle",
    format: "2–3 Hour Group Session",
    mode: "Online",
    when: "Dates announced soon",
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=900&q=70",
  },
];

export const workshopEvents: EventPhoto[] = [
  {
    id: "e1",
    title: "Group Art Therapy Circle",
    location: "Mumbai",
    date: "Mar 2025",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=70",
  },
  {
    id: "e2",
    title: "Sound Healing Session",
    location: "Studio",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=900&q=70",
  },
  {
    id: "e3",
    title: "Women's Wellness Workshop",
    location: "Pune",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&q=70",
  },
  {
    id: "e4",
    title: "Mandala Art Workshop",
    location: "Mumbai",
    date: "Dec 2024",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&q=70",
  },
  {
    id: "e5",
    title: "Meditation & Mindfulness Circle",
    location: "Retreat",
    date: "Nov 2024",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=70",
  },
  {
    id: "e6",
    title: "Creative Healing Gathering",
    location: "Studio",
    date: "Oct 2024",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=70",
  },
];

// ─── Art Studioz — art images & wall art (mix media) ───
// Categories: Canvas Paintings, Wall Art, Mix Media Art, Texture Art, Resin Art,
// Furniture Painting Makeover & Restoration, Textured Wall Panels,
// Customised Paintings & Artwork, Vastu & Feng Shui Based Art
export const portfolioItems: PortfolioItem[] = [
  // ── Canvas Paintings ──
  {
    id: "p1",
    title: "Abstract Floral Canvas",
    slug: "abstract-floral-canvas",
    category: "Canvas Paintings",
    location: "On request",
    year: "2025",
    description:
      "A vibrant abstract floral canvas painting with bold acrylic strokes — layers of colour, movement and natural beauty that bring warmth and joy to any space.",
    coverImage:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=70",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=70",
    ]),
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p1b",
    title: "Serene Landscape Canvas",
    slug: "serene-landscape-canvas",
    category: "Canvas Paintings",
    location: "On request",
    year: "2025",
    description:
      "A peaceful landscape canvas inspired by sunrise over water — soft hues and gentle strokes that create a meditative calm in your living space.",
    coverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=70",
    ]),
    featured: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Wall Art ──
  {
    id: "p2",
    title: "Large Statement Wall Art",
    slug: "large-healing-canvas",
    category: "Wall Art",
    location: "On request",
    year: "2025",
    description:
      "Statement-size wall art designed to transform your living room — bold strokes and harmonious colours crafted to fill your space with positive energy.",
    coverImage:
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=70",
    ]),
    featured: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p2b",
    title: "Botanical Wall Art Series",
    slug: "botanical-wall-art",
    category: "Wall Art",
    location: "Homes & Offices",
    year: "2025",
    description:
      "A curated series of botanical wall pieces — delicate leaves, petals and organic forms that bring nature indoors with elegance and softness.",
    coverImage:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=70",
    ]),
    featured: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Mix Media Art ──
  {
    id: "p3",
    title: "Customised Mix-Media Painting",
    slug: "customized-healing-painting",
    category: "Mix Media Art",
    location: "On request",
    year: "2025",
    description:
      "A one-of-a-kind mix-media painting — layers of acrylic, ink, texture paste, and gold leaf chosen intuitively to match your intention and space.",
    coverImage:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=70",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
    ]),
    featured: true,
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p3b",
    title: "Abstract Mix-Media Collage",
    slug: "abstract-mix-media-collage",
    category: "Mix Media Art",
    location: "On request",
    year: "2025",
    description:
      "An expressive collage combining paper, fabric, paint and metallic elements — a rich layered artwork that tells a story through colour and texture.",
    coverImage:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=70",
    ]),
    featured: true,
    order: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Texture Art ──
  {
    id: "p4",
    title: "Layered Texture Wall Art",
    slug: "texture-art",
    category: "Texture Art",
    location: "On request",
    year: "2025",
    description:
      "Layered texture wall art that brings tactile depth and warmth — built with mixed media, paste, pigment and intuitive movement for a three-dimensional effect.",
    coverImage:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=70",
    ]),
    featured: true,
    order: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p4b",
    title: "Earthy Impasto Piece",
    slug: "earthy-impasto",
    category: "Texture Art",
    location: "On request",
    year: "2025",
    description:
      "A richly textured impasto piece in warm earthy tones — thick sculpted paint layers that catch the light and create a living surface on your wall.",
    coverImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=70",
    ]),
    featured: true,
    order: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Resin Art ──
  {
    id: "p5",
    title: "Ocean Wave Resin Art",
    slug: "resin-art",
    category: "Resin Art",
    location: "On request",
    year: "2025",
    description:
      "Glossy, free-flowing resin artwork — luminous waves of colour and depth that catch the light and bring a modern, soulful glow to your wall.",
    coverImage:
      "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=900&q=70",
    ]),
    featured: true,
    order: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p5b",
    title: "Geode Resin Wall Piece",
    slug: "geode-resin-piece",
    category: "Resin Art",
    location: "On request",
    year: "2025",
    description:
      "A stunning geode-inspired resin piece — crystalline edges, swirling colours and a glossy depth that makes every angle unique.",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
    ]),
    featured: true,
    order: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Furniture Painting Makeover & Restoration ──
  {
    id: "p6",
    title: "Hand-Painted Cabinet Makeover",
    slug: "furniture-makeover",
    category: "Furniture Painting Makeover & Restoration",
    location: "On request",
    year: "2025",
    description:
      "Old furniture lovingly transformed — hand-painted makeovers and restoration that breathe new colour, character and life into cherished pieces.",
    coverImage:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=70",
    ]),
    featured: true,
    order: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p6b",
    title: "Vintage Dresser Restoration",
    slug: "vintage-dresser-restoration",
    category: "Furniture Painting Makeover & Restoration",
    location: "On request",
    year: "2025",
    description:
      "A beautiful vintage dresser brought back to life with artistic hand-painted details — floral motifs, fresh colour, and a whole new personality.",
    coverImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=900&q=70",
    ]),
    featured: true,
    order: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Textured Wall Panels ──
  {
    id: "p7",
    title: "3D Textured Wall Panel",
    slug: "textured-wall-panel",
    category: "Textured Wall Panels",
    location: "Homes & Offices",
    year: "2025",
    description:
      "Modern textured wall panels that add architectural depth and artistic flair — handcrafted geometric and organic patterns in elegant neutral tones.",
    coverImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=70",
    ]),
    featured: true,
    order: 13,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p7b",
    title: "Decorative Accent Wall Panel",
    slug: "accent-wall-panel",
    category: "Textured Wall Panels",
    location: "Homes & Offices",
    year: "2025",
    description:
      "A decorative accent panel designed to become the focal point of any room — layered textures and subtle colour that elevate your interiors.",
    coverImage:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=70",
    ]),
    featured: true,
    order: 14,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Customised Paintings & Artwork ──
  {
    id: "p8",
    title: "Personalised Portrait Painting",
    slug: "personalised-portrait",
    category: "Customised Paintings & Artwork",
    location: "On request",
    year: "2025",
    description:
      "A fully personalised painting — created from your story, colours, emotions and space. Every piece is one-of-a-kind, made just for you.",
    coverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=70",
    ]),
    featured: true,
    order: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p8b",
    title: "Commissioned Abstract Artwork",
    slug: "commissioned-abstract",
    category: "Customised Paintings & Artwork",
    location: "On request",
    year: "2025",
    description:
      "A commissioned abstract artwork designed around your chosen colours, theme and intention — intuitive, soulful and made with love.",
    coverImage:
      "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=70",
    ]),
    featured: true,
    order: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // ── Vastu & Feng Shui Based Art ──
  {
    id: "p9",
    title: "Vastu-Based Wall Painting",
    slug: "vastu-based-painting",
    category: "Vastu & Feng Shui Based Art",
    location: "Homes & Offices",
    year: "2025",
    description:
      "Mix-media wall paintings designed around Vastu Shastra principles — placed thoughtfully on your walls to invite prosperity, harmony and protection.",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=70",
    ]),
    featured: true,
    order: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p9b",
    title: "Feng Shui Harmony Piece",
    slug: "feng-shui-harmony",
    category: "Vastu & Feng Shui Based Art",
    location: "Homes & Offices",
    year: "2025",
    description:
      "An art piece inspired by Feng Shui elements — water, earth, fire, wood and metal harmonised in colour and form to bring balance and positive energy.",
    coverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=70",
    ]),
    featured: true,
    order: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ─── Sessions & Programs (shown under "Courses") ───
export const courses: Course[] = [
  {
    id: "c0",
    title: "Gentle Healing Session",
    slug: "gentle-healing-session",
    tagline: "A soft one-to-one online healing session to begin your journey",
    description:
      "A gentle, nurturing one-to-one online session — perfect as a first step into healing. Relaxation, emotional release and energy balancing held in a safe, caring space.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=70",
    price: 1111,
    originalPrice: null,
    duration: "One-to-One · Online",
    level: "All levels",
    modules: JSON.stringify([
      { title: "Gentle Check-In", lessons: ["A soft conversation about how you are feeling", "Setting an intention for the session"] },
      { title: "Healing & Relaxation", lessons: ["Guided relaxation", "Gentle energy balancing", "Emotional release"] },
      { title: "Closing & Care", lessons: ["Grounding practice", "Simple self-care guidance for the week"] },
    ]),
    outcomes: JSON.stringify([
      "Deep relaxation & emotional lightness",
      "A safe first experience of healing",
      "Simple self-care practices to continue at home",
    ]),
    featured: true,
    published: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c1",
    title: "Personal Deep Healing & Counseling Session",
    slug: "personal-counseling-healing-session",
    tagline: "One-to-One Online Session for deep emotional healing & inner alignment",
    description:
      "A personalised deep-healing session designed to support emotional healing, mental clarity, inner transformation, energy balancing and overall well-being. Every session is customised according to your personal challenges, emotional state, lifestyle and healing requirements.",
    coverImage:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=70",
    price: 3333,
    originalPrice: null,
    duration: "One-to-One · Online",
    level: "All levels",
    modules: JSON.stringify([
      { title: "1. Discovery & Assessment", lessons: ["Detailed discovery call", "Personal history & lifestyle review", "Questionnaires to find the root cause"] },
      { title: "2. Healing & Therapy", lessons: ["Personalised healing technique", "Emotional release", "Energy balancing & inner alignment"] },
      { title: "3. Counseling & Transformation", lessons: ["One-to-one counseling", "Mindset transformation", "Self-awareness & growth guidance"] },
      { title: "4. Action Plan & Follow-Up", lessons: ["Personalised homework", "Healing practices for daily life", "Actionable follow-up plan"] },
    ]),
    outcomes: JSON.stringify([
      "Emotional release & nervous-system relaxation",
      "Clarity on root causes & life direction",
      "A personalised healing & action plan",
      "A calmer, more aligned version of you",
    ]),
    featured: true,
    published: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c2",
    title: "Follow-Up Counseling Session",
    slug: "follow-up-counseling-session",
    tagline: "Continued support for healing & growth",
    description:
      "A one-to-one online follow-up session designed to support you after the main healing & therapy session. We review emotional progress, clear doubts and provide continued guidance for your healing journey.",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=70",
    price: 1111,
    originalPrice: null,
    duration: "≈ 30 minutes · within 1 month of main session",
    level: "Existing clients",
    modules: JSON.stringify([
      { title: "Progress Review", lessons: ["Emotional progress check-in", "Reflection on the healing journey"] },
      { title: "Continued Guidance", lessons: ["Clarity for current challenges", "Motivation & counseling support"] },
      { title: "Plan Adjustments", lessons: ["Tweaking healing practices", "Updating your actionable plan"] },
    ]),
    outcomes: JSON.stringify([
      "Progress review & emotional support",
      "Guidance for challenges during healing",
      "Renewed clarity & motivation",
      "Adjustments to healing practices",
    ]),
    featured: true,
    published: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c3",
    title: "Garbha Sanskar & Prenatal Wellness Session",
    slug: "garbha-sanskar",
    tagline: "A 9-month healing & counseling journey for mother and baby",
    description:
      "A special healing & counseling program designed exclusively for pregnant women and their babies. Focuses on emotional well-being of the mother, positive energy healing, healthy brain development of the baby and a calm, nurturing pregnancy journey.",
    coverImage:
      "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=900&q=70",
    price: 3333,
    originalPrice: null,
    duration: "One-to-One · Online · per session",
    level: "Expectant mothers",
    modules: JSON.stringify([
      { title: "Mother's Well-being", lessons: ["Emotional & mental well-being", "Calming the nervous system", "Pregnancy stress release"] },
      { title: "Mother–Baby Bonding", lessons: ["Positive energy healing", "Strengthening emotional bonding", "Guided visualisations"] },
      { title: "Baby's Development", lessons: ["Healthy brain development", "Smart, strong & emotionally balanced baby", "Healing practices through 9 months"] },
    ]),
    outcomes: JSON.stringify([
      "Calm, conscious pregnancy journey",
      "Stronger mother–baby bond",
      "Healthy emotional & brain development for the baby",
      "Healing, counseling & guided practices throughout",
    ]),
    featured: true,
    published: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c4",
    title: "Mother & Child Healing Session",
    slug: "mother-child-development",
    tagline: "Foundation-years support for emotional, mental & neurological growth",
    description:
      "One-to-one personalised sessions for mothers and children to support the child's emotional, mental and neurological development during the most important foundation years (0–10). Includes healing, counseling and conscious parenting guidance.",
    coverImage:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&q=70",
    price: 3333,
    originalPrice: null,
    duration: "One-to-One · Online · per session",
    level: "Mothers & children (0–10 yrs)",
    modules: JSON.stringify([
      { title: "Child Development", lessons: ["Healthy neurological growth", "Focus, intelligence & creativity", "Confidence & emotional balance"] },
      { title: "Conscious Parenting", lessons: ["Healthy parenting guidance", "Loving & nurturing environment", "Day-1-onwards support"] },
      { title: "Foundations for Life", lessons: ["Positive habits & discipline", "Creative thinking", "Strong emotional foundations"] },
    ]),
    outcomes: JSON.stringify([
      "Sharper, smarter, more expressive child",
      "Stronger emotional foundations",
      "Confident, conscious parenting",
      "Healing & guidance for both mother & child",
    ]),
    featured: true,
    published: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c5",
    title: "4-Week Personal Transformation Healing Program",
    slug: "4-week-transformation-program",
    tagline: "A one-month one-to-one healing & growth journey — 8 online sessions",
    description:
      "A beautiful one-month healing & growth journey designed to help you become emotionally balanced, mentally clear, spiritually aligned and consistent in achieving your goals. Includes 4 deep therapy sessions (90 min each, Friday mornings) and 4 meditation & journaling sessions (30 min each, Tuesday mornings).",
    coverImage:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&q=70",
    price: 11111,
    originalPrice: null,
    priceUnit: "full program · 8 sessions",
    duration: "1 Month · 8 One-to-One Online Sessions",
    level: "All levels",
    modules: JSON.stringify([
      { title: "4 Deep Therapy Sessions (Fri · 90 min)", lessons: ["Deep healing", "Counseling", "Emotional release", "Art therapy", "Meditation & journaling", "Inner transformation & guidance"] },
      { title: "4 Meditation & Journaling Sessions (Tue · 30 min)", lessons: ["Inner healing", "Building consistency & discipline", "Mental clarity & positive mindset", "Goal planning & direction", "Motivation & self-growth"] },
    ]),
    outcomes: JSON.stringify([
      "Emotional healing & balance",
      "Healthy routines & consistency",
      "More focus, clarity & self-awareness",
      "Goal achievement with guidance",
    ]),
    featured: true,
    published: true,
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ─── Testimonials ───
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aanya R.",
    role: "Personal Counseling Client",
    quote: "I came in with so much noise inside. After one session of healing and counseling, I could finally hear myself again.",
    rating: 5,
    image: null,
    order: 1,
    createdAt: new Date(),
  },
  {
    id: "t2",
    name: "Rhea M.",
    role: "Garbha Sanskar Program",
    quote: "My pregnancy felt held — emotionally, energetically, beautifully. I am calmer, and so is my baby.",
    rating: 5,
    image: null,
    order: 2,
    createdAt: new Date(),
  },
  {
    id: "t3",
    name: "Kavya S.",
    role: "4-Week Transformation Program",
    quote: "Eight sessions over one month rewired my relationship with consistency. I finally feel aligned with my goals.",
    rating: 5,
    image: null,
    order: 3,
    createdAt: new Date(),
  },
  {
    id: "t4",
    name: "Meera P.",
    role: "Mother & Child Sessions",
    quote: "My son is more focused, more expressive — and I feel like a more conscious mother. Every session is gold.",
    rating: 5,
    image: null,
    order: 4,
    createdAt: new Date(),
  },
];

