import type { MetadataRoute } from "next";
import { blogPostsByLocale } from "@/lib/blogPosts";
import { marketingSlugs } from "@/lib/marketingPages";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const urls = new Set<string>();

  urls.add("/");
  urls.add("/pricing");
  urls.add("/blog");

  marketingSlugs.forEach((slug) => {
    urls.add(`/${slug}`);
  });

  const blogSlugs = new Set<string>();
  Object.values(blogPostsByLocale).forEach((posts) => {
    posts.forEach((post) => blogSlugs.add(post.slug));
  });
  blogSlugs.forEach((slug) => {
    urls.add(`/blog/${slug}`);
  });

  return Array.from(urls).map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/blog/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
