import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("interview-practice");
}

export default async function InterviewPracticePage() {
  return <MarketingPageShell slug="interview-practice" />;
}
