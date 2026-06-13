"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Clock, Lock, ArrowRight, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="wisdom" className="container-page scroll-mt-24 py-20 sm:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
        <div>
          <ScrollReveal>
            <div className="pill mb-4"><Sparkles className="h-3.5 w-3.5" /> The journal</div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Wisdom &amp; <span className="heading-script text-plum-500">Inspiration</span>
            </h2>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <Link href="/blog" className="btn-ghost">
            Read the journal <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="card-journal group flex h-full flex-col overflow-hidden p-0 transition-transform hover:-translate-y-1.5"
            >
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/4]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-earth-700 backdrop-blur">
                  {post.category}
                </div>
                {post.gated && (
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-plum-700 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cream-50">
                    <Lock className="h-3 w-3" /> Members
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl text-earth-900">{post.title}</h3>
                <p className="mt-2 flex-1 body-soft text-sm">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-earth-500">
                  <Clock className="h-3 w-3" /> {post.readMinutes} min read
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
