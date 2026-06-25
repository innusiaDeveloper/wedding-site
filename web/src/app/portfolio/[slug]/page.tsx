import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { directusFetch } from "@/lib/directus";
import { absoluteUrl, directusAssetUrl } from "@/lib/seo";
import { ProjectGallery } from "@/components/ProjectGallery";

type DirectusFile = {
  id: string;
  title?: string | null;
  type?: string | null;
};

type GalleryItem = {
  id: number;
  directus_files_id: DirectusFile | string | null;
};

type Project = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  cover?: string | { id: string } | null;
  gallery?: GalleryItem[] | null;
};

function normalizeSlug(value: string) {
  return decodeURIComponent(value).trim().toLowerCase();
}

function getCoverId(cover: Project["cover"]): string | null {
  if (!cover) return null;
  return typeof cover === "string" ? cover : (cover.id ?? null);
}

function getGalleryFile(
  value: GalleryItem["directus_files_id"],
): DirectusFile | null {
  if (!value) return null;

  if (typeof value === "string") {
    return {
      id: value,
      title: null,
      type: null,
    };
  }

  return value;
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  const url =
    `/items/projects?fields=` +
    `id,title,slug,excerpt,content,cover.id,` +
    `gallery.id,` +
    `gallery.directus_files_id.id,` +
    `gallery.directus_files_id.title,` +
    `gallery.directus_files_id.type` +
    `&filter[status][_eq]=published`;

  const res = await directusFetch<{ data: Project[] }>(url, {
    cache: "no-store",
  });

  const normalized = normalizeSlug(slug);

  return (
    res.data?.find((item) => normalizeSlug(item.slug) === normalized) ?? null
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Проект не найден",
      robots: { index: false, follow: false },
    };
  }

  const coverId = getCoverId(project.cover);

  const ogImage = coverId
    ? directusAssetUrl(coverId, {
        width: 1200,
        height: 630,
        quality: 85,
        fit: "cover",
      })
    : undefined;

  const url = absoluteUrl(`/portfolio/${project.slug}`);
  const description =
    (project.excerpt ?? "").trim() || "Фотографии, детали и описание проекта.";

  return {
    title: `${project.title} | Портфолио`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return notFound();

  const coverId = getCoverId(project.cover);

  const coverUrl = coverId
    ? directusAssetUrl(coverId, {
        width: 2200,
        quality: 85,
        fit: "cover",
      })
    : null;

  const images: Array<{
    id: string;
    src: string;
    alt: string;
    type: "image" | "video";
    poster: string | null;
  }> =
    project.gallery
      ?.map((item) => getGalleryFile(item.directus_files_id))
      .filter((file): file is DirectusFile => Boolean(file?.id))
      .map((file) => {
        const isVideo = file.type?.startsWith("video") ?? false;

        return {
          id: file.id,
          src: directusAssetUrl(file.id),
          alt: file.title ?? project.title,
          type: isVideo ? "video" : "image",
          poster: null,
        };
      }) ?? [];

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:py-24">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/portfolio"
            className="
              inline-flex items-center gap-2 rounded-2xl
              border border-brand-dark/15 bg-brand-paper
              px-4 py-2 text-sm font-ui font-medium text-brand-dark
              transition hover:border-brand-green/35 hover:text-brand-deep
              hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]
            "
          >
            <span aria-hidden>←</span>
            Все проекты
          </Link>
        </div>

        <header className="relative mt-8 overflow-hidden rounded-3xl border border-brand-dark/10 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
          {coverUrl ? (
            <div className="relative h-[400px] sm:h-[520px] lg:h-[660px]">
              <Image
                src={coverUrl}
                alt={project.title}
                fill
                unoptimized
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
            </div>
          ) : (
            <div className="h-[320px] bg-brand-olive/10 sm:h-[420px] lg:h-[520px]" />
          )}

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-6 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
              <h1 className="max-w-5xl font-display font-light text-3xl leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              {project.excerpt ? (
                <p className="mt-3 max-w-2xl font-ui text-sm leading-[1.75] text-white/85 sm:text-base">
                  {project.excerpt}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        {project.content ? (
          <section className="mt-10 rounded-3xl border border-brand-dark/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <article
              className="
        prose prose-lg max-w-none
        prose-headings:font-display
        prose-headings:font-light
        prose-headings:text-brand-dark
        prose-h2:mt-10
        prose-h2:mb-5
        prose-h2:text-3xl
        prose-h3:mt-8
        prose-h3:mb-4
        prose-h3:text-2xl
        prose-p:text-brand-brown
        prose-p:leading-8
        prose-ul:my-5
        prose-li:text-brand-brown
        prose-li:leading-8
        prose-li:marker:text-brand-green
        prose-strong:text-brand-dark
        prose-a:text-brand-deep
      "
            >
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </article>
          </section>
        ) : null}

        <ProjectGallery
          title="Фотографии проекта"
          subtitle="Подборка ключевых кадров и деталей."
          images={images}
        />
      </div>
    </main>
  );
}
