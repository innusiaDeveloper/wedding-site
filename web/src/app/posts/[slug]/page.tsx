import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostBySlugWithMedia } from "@/lib/posts";
import { PostDetailContent } from "@/components/PostDetailContent";
import { absoluteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlugWithMedia(slug);

  if (!post) {
    return {
      title: "Публикация не найдена",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.title?.trim() || "Свадебный проект";

  const postSlug = post.slug?.trim() || slug;

  const description =
    post.caption?.replace(/\s+/g, " ").trim().slice(0, 160) ||
    `${title}. Свадебные проекты, идеи и вдохновение от свадебного организатора Александры Пирог.`;

  const url = absoluteUrl(`/posts/${postSlug}`);

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Александра Пирог",
      locale: "ru_RU",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlugWithMedia(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <PostDetailContent post={post} />
    </main>
  );
}
