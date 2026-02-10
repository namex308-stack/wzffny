import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("contact");
}

export default async function ContactPage() {
  return <MarketingPageShell slug="contact" />;
}
