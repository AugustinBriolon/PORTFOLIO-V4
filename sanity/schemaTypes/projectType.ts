import { ProjectsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'projects',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error(
            'The title is required and should be between 5 and 100 characters.'
          ),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectIndex',
      title: 'Project Index',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      options: {
        dateFormat: 'MM-yyyy',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Link to Website',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'repoUrl',
      title: 'Link to Repository',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'story',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),
    defineField({
      name: 'types',
      title: 'Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'language',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'language' }] }],
    }),

  ],
});
