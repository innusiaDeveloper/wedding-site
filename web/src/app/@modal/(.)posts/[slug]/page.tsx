import { notFound } from "next/navigation";

import { getPostBySlugWithMedia } from "@/lib/posts";
import { PostModalShell } from "@/components/PostModalShell";
import { PostDetailContent } from "@/components/PostDetailContent";

export default async function PostModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugWithMedia(slug);

  if (!post) return notFound();

  return (
    <PostModalShell>
      <PostDetailContent post={post} compact />
    </PostModalShell>
  );
}
