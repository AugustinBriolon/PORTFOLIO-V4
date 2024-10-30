import { DocumentTextIcon } from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      type: 'url',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
  ],
})