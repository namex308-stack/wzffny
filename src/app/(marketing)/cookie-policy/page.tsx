import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("cookie-policy");
}

export default async function CookiePolicyPage() {
  return <MarketingPageShell slug="cookie-policy" />;
}
