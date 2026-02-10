import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("video-tips");
}

export default async function VideoTipsPage() {
  return <MarketingPageShell slug="video-tips" />;
}
