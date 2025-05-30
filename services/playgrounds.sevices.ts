import { client } from "@/sanity/lib/client";

export const fetchPlaygrounds = async () => {
  const query = `
    *[_type == "playgrounds"] | order(orderRank) {
      title,
      slug,
      mainImage,
      description,
      publishedAt,
      websiteUrl,
    }`;

  const playgrounds = await client.fetch(query);

  return playgrounds;
};
