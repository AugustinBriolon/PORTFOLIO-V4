import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';

export const fetchProject = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "projects" && slug.current == $project][0] {
      title,
      slug,
      projectIndex,
      publishedAt,
      description,
      story,
      mainImage,
      gallery,
      websiteUrl,
      "authors": authors[]->{
        name,
        websiteUrl
      },
      "types": types[]->{
        title
      },
    }
  `;

  const project = await client.fetch(query, {
    project: params?.project,
  });

  return project;
};
