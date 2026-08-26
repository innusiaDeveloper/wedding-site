import type { Metadata } from "next";

import { getPostsWithMedia } from "@/lib/posts";
import { PostsFeed } from "@/components/PostsFeed";

export const metadata: Metadata = {
  title: "Публикации | ALEKSANDRA.PIROG.RU",
  description: "Публикации, Reels, фото и истории проектов.",
};

export default async function PostsPage() {
  const posts = await getPostsWithMedia();

  const safePosts = posts.filter(
    (post) => typeof post.slug === "string" && post.slug.trim().length > 0,
  );

  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24">
        <header className="mb-10">
          <h1 className="font-display font-light text-4xl leading-[0.98] tracking-[-0.02em] text-brand-dark sm:text-5xl lg:text-6xl">
            Публикации
          </h1>

          <p className="mt-4 max-w-2xl font-ui text-base leading-[1.75] text-brand-brown/85">
            Reels, фотографии, детали и визуальные истории проектов.
          </p>
        </header>

        <PostsFeed posts={safePosts} />
      </div>
    </main>
  );
}
