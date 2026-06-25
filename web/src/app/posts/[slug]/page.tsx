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

  const description =
    post.caption?.replace(/\s+/g, " ").trim().slice(0, 160) ||
    "Публикация Александры Пирог";

  return {
    title: `${post.title} | Публикации`,
    description,

    alternates: {
      canonical: absoluteUrl(`/posts/${post.slug}`),
    },

    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: absoluteUrl(`/posts/${post.slug}`),
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
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
