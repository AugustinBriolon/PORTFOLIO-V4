import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';

export const fetchProject = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "projects" && slug.current == $project][0] {
      title,
      slug,
      publishedAt,
      description,
      story,
      mainImage,
      video{
        "mp4Url": mp4.asset->url,
        "webmUrl": webm.asset->url
      },
      websiteUrl,
      "authors": authors[]->{
        name,
        websiteUrl
      },
      "types": types[]->{
        title
      },
      "language": language[]->{
        title,
        url
      },
      "testimonial": testimonial[]->{
        author,
        role,
        quote
      },
    }
  `;

  const project = await client.fetch(query, {
    project: params?.project,
  });

  return project;
};
