import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { blogPostsByLocale, getBlogPost, type BlogBlock } from "@/lib/blogPosts";
import { getServerLocale } from "@/lib/locale.server";
import { getSiteContent } from "@/lib/siteContent";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={`h2-${index}`} className="text-2xl md:text-3xl font-semibold text-gray-900">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={`h3-${index}`} className="text-xl md:text-2xl font-semibold text-gray-900">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={`p-${index}`} className="text-gray-700 leading-relaxed">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={`ul-${index}`}
          className="list-disc list-inside space-y-2 text-gray-700"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export function generateStaticParams() {
  const slugs = new Set<string>();
  Object.values(blogPostsByLocale).forEach((posts) => {
    posts.forEach((post) => slugs.add(post.slug));
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = await getServerLocale();
  const post = getBlogPost(resolvedParams.slug, locale);

  if (!post) {
    return {
      title: "Post Not Found | Interviewly Blog",
    };
  }

  const title = post.metaTitle || `${post.title} | Interviewly Blog`;

  return {
    title,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title,
      description: post.metaDescription,
      type: "article",
      siteName: "Interviewly",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const locale = await getServerLocale();
  const content = getSiteContent(locale);
  const post = getBlogPost(resolvedParams.slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-600 font-semibold">
                {content.copy.blogIndex.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {post.metaDescription}
              </p>
            </div>

            <article className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {post.intro}
              </p>
              {post.content.map((block, index) => renderBlock(block, index))}

              <section className="pt-4 space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {content.copy.blogPost.conclusionTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {post.conclusion.text}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {post.conclusion.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>
            </article>

            <section className="mt-12 rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {content.copy.blogPost.continueTitle}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {content.copy.blogPost.continueDescription}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {post.internalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold text-gray-900">
                      {link.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
