import { client } from '@/sanity/lib/client';

export const fetchBlogs = async () => {
  const query = `
    *[_type == "blogs"] | order(blogIndex asc) {
      blogIndex,
      title,
      slug,
      mainImage,
      description,
      "tags": tags[]->value,
    }`;

  const blogs = await client.fetch(query);

  return blogs;
};
