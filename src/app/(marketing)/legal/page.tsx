import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("legal");
}

export default async function LegalPage() {
  return <MarketingPageShell slug="legal" />;
}
