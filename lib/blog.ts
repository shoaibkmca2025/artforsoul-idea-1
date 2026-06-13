// Blog content. `gated: true` posts show only an excerpt to signed-out
// visitors; the full body opens after login. Free posts are open to all.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readMinutes: number;
  gated: boolean;
  /** Paragraphs of the full article. */
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-art-therapy",
    title: "What is Art Therapy, really?",
    excerpt:
      "You don't need to be an artist to heal through art. Here's how making marks on a page can gently move what words cannot.",
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
    category: "Art Therapy",
    readMinutes: 4,
    gated: false,
    body: [
      "Art therapy is not about making something beautiful — it's about making something true. When emotions feel too big or too tangled for words, colour, line and texture give them a safe place to land.",
      "In a session we might begin with a few slow breaths, then let the hand move without a plan. There is no right or wrong; the process itself is the medicine.",
      "Over time, many people find that what they couldn't say out loud begins to soften on the page — and from there, in their bodies and their days.",
    ],
  },
  {
    slug: "morning-rituals-for-calm",
    title: "5 gentle morning rituals for a calmer mind",
    excerpt:
      "Small, soft practices to begin your day grounded — no special tools, just a few mindful minutes for yourself.",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=70",
    category: "Wellness",
    readMinutes: 3,
    gated: false,
    body: [
      "How you begin your morning quietly sets the tone for everything that follows. These five rituals take only a few minutes each.",
      "1. Before reaching for your phone, take three slow breaths. 2. Drink a glass of water with intention. 3. Stretch gently for two minutes. 4. Write one line of gratitude. 5. Set a single soft intention for the day.",
      "Consistency matters more than length. Even on busy mornings, one ritual done with presence is enough.",
    ],
  },
  {
    slug: "garbha-sanskar-explained",
    title: "Garbha Sanskar: nurturing your baby from the womb",
    excerpt:
      "An ancient practice for a conscious, peaceful pregnancy — and how modern mothers are weaving it into their journey.",
    coverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=70",
    category: "Motherhood",
    readMinutes: 6,
    gated: true,
    body: [
      "Garbha Sanskar is the practice of nurturing your baby's physical, mental and emotional development from the womb through positive energy, sound, meditation and bonding.",
      "Research increasingly supports what this tradition has long known: a calm, emotionally supported mother creates a calmer environment for her growing baby.",
      "In our sessions we combine gentle meditation, sound, affirmations and emotional healing for the mother — strengthening the bond between mother and baby through all nine months.",
      "Each session is personalised to where you are in your journey, and to what your heart and body need on the day.",
    ],
  },
  {
    slug: "inner-child-healing",
    title: "Meeting your inner child with kindness",
    excerpt:
      "The tender work of returning to the parts of us that were once small — and learning to hold them gently now.",
    coverImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=900&q=70",
    category: "Healing",
    readMinutes: 5,
    gated: true,
    body: [
      "Inner child healing is the gentle practice of reconnecting with the younger version of yourself — the one who may still carry old hurts, fears or unmet needs.",
      "Through guided visualisation, art and compassionate dialogue, we begin to offer that child what they may not have received then: safety, validation, and love.",
      "This work can feel tender, and we move only as fast as feels safe. The aim is not to relive pain, but to release it — and to parent yourself with the warmth you always deserved.",
    ],
  },
  {
    slug: "art-for-your-home-energy",
    title: "How art shapes the energy of your home",
    excerpt:
      "Colour, texture and placement carry feeling. A look at creating artwork that supports harmony, using Vastu & Feng Shui.",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=70",
    category: "Art Studioz",
    readMinutes: 4,
    gated: true,
    body: [
      "The art on your walls is never just decoration — colour and form quietly influence how a space feels to live in.",
      "Drawing on Vastu and Feng Shui, we consider direction, colour and intention when creating a piece, so it supports the energy you want in each room.",
      "A warm abstract in the living room, a calming palette in the bedroom, an uplifting piece by your entrance — each is made thoughtfully for your space, emotions and theme.",
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
