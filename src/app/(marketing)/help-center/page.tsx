import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("help-center");
}

export default async function HelpCenterPage() {
  return <MarketingPageShell slug="help-center" />;
}
