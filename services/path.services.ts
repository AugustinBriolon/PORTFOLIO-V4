import { Posts } from '@/data/types';
import { client } from '@/sanity/lib/client';

export const fetchPaths = async () => {
  const query = `
    *[_type == "post"] {
      slug,
      title
    }
  `;

  const posts = await client.fetch(query);

  const paths = posts.map((post: Posts) => ({
    slug: post.slug.current,
    title: post.title,
  }));

  return paths;
};