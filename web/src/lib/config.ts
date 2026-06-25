export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055";

if (!DIRECTUS_URL) {
  throw new Error("Missing NEXT_PUBLIC_DIRECTUS_URL");
}
