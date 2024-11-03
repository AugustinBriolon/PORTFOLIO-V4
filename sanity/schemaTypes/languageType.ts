import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const languageType = defineType({
  name: 'language',
  title: 'Language',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
})
