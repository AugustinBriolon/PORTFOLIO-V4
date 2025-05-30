import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { authorType } from "./authorType";
import { testimonialType } from "./testimonialType";
import { languageType } from "./languageType";
import { projectType } from "./projectType";
import { playgroundType } from "./playgroundType";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, authorType, projectType, playgroundType, testimonialType, languageType],
};
