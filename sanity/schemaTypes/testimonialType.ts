import { AddCommentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  icon: AddCommentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: { type: 'projects' },
    })
  ],
});
