import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';

export const fetchBlog = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "blogs" && slug.current == $blog][0] {
      blogIndex,
      title,
      slug,
      mainImage,
      description,
      gallery,
      "authors": authors[]->{
        name,
        websiteUrl
      },
      story,
    }
  `;

  const blog = await client.fetch(query, {
    blog: params?.blog,
  });

  return blog;
};
