import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { Clock, Lock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog — Art For Soul",
  description: "Gentle writings on healing, art therapy, motherhood and soulful living.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Soft writings on healing,"
        script="art & soulful living."
        subtitle="Gentle reflections on art therapy, motherhood, inner healing and creating a more aligned life."
      />

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.06} direction="up" className="h-full">
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
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-earth-500">
                      <Clock className="h-3 w-3" /> {post.readMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-earth-700 group-hover:text-earth-900">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
