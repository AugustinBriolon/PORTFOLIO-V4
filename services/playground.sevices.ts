import { client } from "@/sanity/lib/client";
import { ParsedUrlQuery } from "querystring";

export const fetchPlayground = async (params: ParsedUrlQuery | undefined) => {
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
    }
  `;

  const playground = await client.fetch(query, {
    playground: params?.playground,
  });

  return playground;
};
