import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, blogPosts } from "@/lib/blog";
import { getCurrentUser } from "@/lib/session";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Clock, Lock, ArrowLeft, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return { title: post ? `${post.title} — Art For Soul` : "Blog — Art For Soul" };
}

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return notFound();

  const user = await getCurrentUser();
  const locked = post.gated && !user;
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-20 sm:pb-24">
      <section className="container-page pt-28 sm:pt-32">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-earth-700 hover:text-earth-900">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>

        <div className="mx-auto mt-6 max-w-3xl">
          <div className="pill mb-4">{post.category}</div>
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-earth-500">
            <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
          </p>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50 shadow-journal sm:rounded-[2rem] sm:border-8">
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-earth-700/90 sm:text-lg">
            <p className="font-medium text-earth-900">{post.excerpt}</p>

            {locked ? (
              <>
                {/* First paragraph teased, rest locked */}
                <p>{post.body[0]}</p>
                <div className="relative mt-2 overflow-hidden rounded-3xl border border-earth-300/40 bg-cream-50/70 p-8 text-center shadow-soft">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-plum-700 text-cream-50">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl text-plum-700">Members-only post</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm body-soft">
                    Create a free account or log in to read the full post and unlock
                    all members' writings.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link href={`/login?redirect_url=/blog/${post.slug}`} className="btn-primary">
                      Log in to read <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={`/signup?redirect_url=/blog/${post.slug}`} className="btn-ghost">
                      Create free account
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              post.body.map((para, i) => <p key={i}>{para}</p>)
            )}
          </div>
        </div>
      </section>

      {/* More posts */}
      <section className="container-page mt-16">
        <h2 className="heading-display mb-6 text-2xl sm:text-3xl">More from the journal</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {others.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${p.slug}`}
                className="card-journal group flex h-full flex-col overflow-hidden p-0"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.coverImage} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {p.gated && (
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-plum-700 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-cream-50">
                      <Lock className="h-3 w-3" /> Members
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg text-earth-900">{p.title}</h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  );
}
