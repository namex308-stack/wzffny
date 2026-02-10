import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("terms-of-service");
}

export default async function TermsOfServicePage() {
  return <MarketingPageShell slug="terms-of-service" />;
}
