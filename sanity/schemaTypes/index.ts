import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {authorType} from './authorType'
import { testimonialType } from './testimonialType'
import { languageType } from './languageType'
import { projectType } from './projectType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, authorType, projectType, testimonialType, languageType],
}
