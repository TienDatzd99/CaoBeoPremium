import { MDXRemote } from 'next-mdx-remote/rsc';
import { useSession } from 'next-auth/react';
import { getPostBySlug } from '@/lib/posts';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const session = useSession();

  if (post.isPremium && !session?.user?.isPremium) {
    return <div>Premium content - Please subscribe!</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  );
}