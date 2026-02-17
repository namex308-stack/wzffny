const DEFAULT_SITE_URL = "http://localhost:3000";

export const getSiteUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    process.env.VERCEL_URL;

  if (!envUrl) {
    return DEFAULT_SITE_URL;
  }

  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }

  return `https://${envUrl}`;
};

export const getMetadataBase = () => new URL(getSiteUrl());

export const defaultOpenGraphImage = "/opengraph-image";
export const defaultTwitterImage = "/twitter-image";
