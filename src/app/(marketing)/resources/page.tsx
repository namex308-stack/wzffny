import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("resources");
}

export default async function ResourcesPage() {
  return <MarketingPageShell slug="resources" />;
}
