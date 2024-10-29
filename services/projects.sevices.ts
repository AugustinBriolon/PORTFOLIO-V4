import { client } from '@/sanity/lib/client';

export const fetchProjects = async () => {
  const query = `
    *[_type == "projects"] | order(projectIndex asc) {
      projectIndex,
      title,
      slug,
      mainImage,
      websiteUrl,
      "types": types[]->value,
    }`;

  const projects = await client.fetch(query);

  return projects;
};
