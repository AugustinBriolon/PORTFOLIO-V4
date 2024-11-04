import { client } from '@/sanity/lib/client';

export const fetchTestimonials = async () => {
  const query = `
  *[_type == "testimonials"] {
    author,
    role,
    quote
  }`;

  const testimonials = await client.fetch(query);

  return testimonials;
};
