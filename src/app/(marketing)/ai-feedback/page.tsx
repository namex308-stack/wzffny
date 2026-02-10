import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("ai-feedback");
}

export default async function AIFeedbackPage() {
  return <MarketingPageShell slug="ai-feedback" />;
}
