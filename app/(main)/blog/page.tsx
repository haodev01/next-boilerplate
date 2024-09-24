import { Post } from '@/app/(main)/blog/[slug]/page';
import Link from 'next/link';

export const revalidate = 3600; // invalidate every hour

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog');
  const posts = await data.json();

  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <Link
            style={{ marginBottom: '10px', display: 'block' }}
            href={`/blog/${post.id}`}
            key={post.id}
          >
            <li>
              {post.id}.{post.title}
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
