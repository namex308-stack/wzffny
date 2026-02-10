import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("privacy-policy");
}

export default async function PrivacyPolicyPage() {
  return <MarketingPageShell slug="privacy-policy" />;
}
