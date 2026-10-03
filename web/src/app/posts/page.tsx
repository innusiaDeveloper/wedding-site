import type { Metadata } from "next";

import { getPostsWithMedia } from "@/lib/posts";
import { PostsFeed } from "@/components/PostsFeed";

export const metadata: Metadata = {
  title: "Свадьбы, идеи и проекты",

  description:
    "Реальные свадьбы, идеи, площадки и проекты свадебного организатора Александры Пирог. Организация свадеб в Краснодаре, Сочи и Москве.",

  alternates: {
    canonical: "/posts",
  },

  openGraph: {
    type: "website",
    url: "/posts",
    title: "Свадьбы, идеи и проекты — Александра Пирог",
    description:
      "Реальные свадьбы, идеи, площадки и проекты свадебного организатора Александры Пирог.",
  },
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
            Свадьбы, идеи и проекты
          </h1>

          <p className="mt-4 max-w-2xl font-ui text-base leading-[1.75] text-brand-brown/85">
            Реальные свадьбы, идеи, площадки, детали и истории проектов
            свадебного организатора Александры Пирог.
          </p>
        </header>

        <PostsFeed posts={safePosts} />
      </div>
    </main>
  );
}
