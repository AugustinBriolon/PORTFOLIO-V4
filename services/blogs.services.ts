import { client } from '@/sanity/lib/client';

export const fetchBlogs = async () => {
  const query = `
    *[_type == "post"] | order(blogIndex asc) {
      blogIndex,
      title,
      slug,
      author,
      mainImage,
      categories,
      publishedAt,
      body,
    }`;

  const blogs = await client.fetch(query);

  return blogs;
};
