import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("interview-guides");
}

export default async function InterviewGuidesPage() {
  return <MarketingPageShell slug="interview-guides" />;
}
