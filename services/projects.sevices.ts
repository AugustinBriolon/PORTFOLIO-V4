import { client } from '@/sanity/lib/client';

export const fetchProjects = async () => {
  const query = `
    *[_type == "projects"] | order(projectIndex desc) {
      projectIndex,
      title,
      slug,
      mainImage,
      description,
      publishedAt,
      "types": types[]->{
        title,
      },
    }`;

  const projects = await client.fetch(query);

  return projects;
};
