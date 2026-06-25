import { DIRECTUS_URL } from "@/lib/config";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(path: string = "") {
  // base
  const base = SITE_URL;

  // root
  if (!path || path === "/") return base;

  // normal path
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function directusAssetUrl(
  fileId: string,
  params?: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: string;
    format?: "png" | "webp" | "jpg" | "jpeg";
  },
) {
  const qs = new URLSearchParams();

  if (params?.width) qs.set("width", String(params.width));
  if (params?.height) qs.set("height", String(params.height));
  if (params?.quality) qs.set("quality", String(params.quality));
  if (params?.fit) qs.set("fit", params.fit);
  if (params?.format) qs.set("format", params.format);

  const query = qs.toString();
  return `${DIRECTUS_URL}/assets/${fileId}${query ? `?${query}` : ""}`;
}
