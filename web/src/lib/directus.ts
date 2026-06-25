import { DIRECTUS_URL } from "@/lib/config";

type DirectusFetchInit = RequestInit & {
  next?: { revalidate?: number };
};

export async function directusFetch<T>(
  path: string,
  init?: DirectusFetchInit,
): Promise<T> {
  const url = `${DIRECTUS_URL}${path}`;

  const res = await fetch(url, {
    ...init,
    ...(init?.cache === "no-store"
      ? {}
      : { next: init?.next ?? { revalidate: 60 } }),
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Directus error: ${res.status} ${text}`);
  }

  return res.json() as Promise<T>;
}
