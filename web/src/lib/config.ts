export const DIRECTUS_URL = (
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "https://cms.aleksandra-pirog.ru"
).replace(/\/$/, "");

if (!DIRECTUS_URL) {
  throw new Error("Missing NEXT_PUBLIC_DIRECTUS_URL");
}
