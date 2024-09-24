import { blogApi } from '@/api';

export interface Post {
  id: string;
  title: string;
  content: string;
}

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts: Post[] = await blogApi.getList();

  return posts.map((post) => ({
    id: post.id,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await blogApi.getBySlug(params.slug);

  return {
    title: post.title,
  };
}
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await blogApi.getBySlug(params.slug);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
