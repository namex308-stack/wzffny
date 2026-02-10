import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("resume-review");
}

export default async function ResumeReviewPage() {
  return <MarketingPageShell slug="resume-review" />;
}
