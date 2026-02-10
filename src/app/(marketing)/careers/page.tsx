import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("careers");
}

export default async function CareersPage() {
  return <MarketingPageShell slug="careers" />;
}
