import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";
import { marketingSlugs } from "@/lib/marketingPages";

type MarketingPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return marketingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MarketingPageProps): Promise<Metadata> {
  return getMarketingMetadata(params.slug);
}

export default async function MarketingPage({ params }: MarketingPageProps) {
  return <MarketingPageShell slug={params.slug} />;
}
