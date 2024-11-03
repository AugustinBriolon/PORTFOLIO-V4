import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('language').title('Language'),
      S.divider(),
      S.documentTypeListItem('posts').title('Posts'),
      S.documentTypeListItem('projects').title('Projects'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])
