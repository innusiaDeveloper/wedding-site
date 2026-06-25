import { directusFetch } from "@/lib/directus";

type FileRef = {
  id: string;
  type?: string | null;
};

export type PostMedia = {
  id: number;
  type: "image" | "video" | string;
  caption?: string | null;
  duration?: number | null;
  sort?: number | null;
  is_cover?: boolean | null;

  file: FileRef | string;
  poster?: FileRef | string | null;
};

export type Post = {
  id: number;
  status?: string;
  title?: string | null;
  slug?: string | null;
  caption?: string | null;
  location?: string | null;
  published_at?: string | null;
  media?: PostMedia[];
};

type DirectusListResponse<T> = { data: T };

const POST_FIELDS = [
  "id",
  "status",
  "title",
  "slug",
  "caption",
  "location",
  "published_at",

  "media.id",
  "media.type",
  "media.caption",
  "media.duration",
  "media.sort",
  "media.is_cover",

  "media.file.id",
  "media.file.type",
  "media.poster.id",
  "media.poster.type",
].join(",");

function isValidPost(post: Post) {
  return (
    post.status === "published" &&
    typeof post.slug === "string" &&
    post.slug.trim().length > 0
  );
}

export async function getPostsWithMedia() {
  const params = new URLSearchParams();

  params.set("fields", POST_FIELDS);
  params.set("filter[status][_eq]", "published");

  // ВАЖНО:
  // сначала published_at, но если он пустой — сортируем по id,
  // поэтому новые посты всё равно будут наверху.
  params.set("sort", "-published_at,-id");

  params.set("deep[media][_sort]", "sort");
  params.set("limit", "50");

  const res = await directusFetch<DirectusListResponse<Post[]>>(
    `/items/posts?${params.toString()}`,
    { cache: "no-store" },
  );

  return (res.data ?? []).filter(isValidPost);
}

export async function getPostBySlugWithMedia(slug: string) {
  const params = new URLSearchParams();

  params.set("fields", POST_FIELDS);
  params.set("filter[status][_eq]", "published");
  params.set("filter[slug][_eq]", slug);
  params.set("deep[media][_sort]", "sort");
  params.set("limit", "1");

  const res = await directusFetch<DirectusListResponse<Post[]>>(
    `/items/posts?${params.toString()}`,
    { cache: "no-store" },
  );

  return res.data?.[0] ?? null;
}
