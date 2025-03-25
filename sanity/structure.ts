import { ProjectsIcon } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.divider(),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("language").title("Language"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "projects",
        title: "Project",
        icon: ProjectsIcon,
        S,
        context,
      }),
    ]);
