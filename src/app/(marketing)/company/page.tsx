import type { Metadata } from "next";
import { MarketingPageShell, getMarketingMetadata } from "@/components/marketing/MarketingPageShell";

export async function generateMetadata(): Promise<Metadata> {
  return getMarketingMetadata("company");
}

export default async function CompanyPage() {
  return <MarketingPageShell slug="company" />;
}
