import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { blogPostsByLocale } from "@/lib/blogPosts";
import { getServerLocale } from "@/lib/locale.server";
import { getSiteContent } from "@/lib/siteContent";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);
  const title = `${content.copy.blogIndex.title} | wzzfny`;
  const description = content.copy.blogIndex.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/blog",
      images: [
        {
          url: defaultOpenGraphImage,
          width: 1200,
          height: 630,
          alt: "wzzfny",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultTwitterImage],
    },
  };
}

export default async function BlogIndexPage() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);
  const posts = blogPostsByLocale[locale] ?? blogPostsByLocale.en;

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-600 font-semibold">
                {content.copy.blogIndex.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                {content.copy.blogIndex.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {content.copy.blogIndex.subtitle}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-gray-100 p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-semibold">
                    {content.copy.blogIndex.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-gray-900 group-hover:text-indigo-600">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-indigo-600">
                    {content.copy.blogIndex.readArticle}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

