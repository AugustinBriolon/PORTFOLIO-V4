import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const playgroundType = defineType({
  name: "playgrounds",
  title: "Playground",
  type: "document",
  icon: PresentationIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "playgrounds" }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error("The title is required and should be between 5 and 100 characters."),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, ""),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      options: {
        dateFormat: "MM-yyyy",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "websiteUrl",
      title: "Link to Website",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "repoUrl",
      title: "Link to Repository",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "story",
      type: "blockContent",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "object",
      fields: [
        {
          name: "mp4",
          title: "MP4 Video",
          type: "file",
          options: {
            accept: "video/mp4",
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "webm",
          title: "WebM Video",
          type: "file",
          options: {
            accept: "video/webm",
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),
    defineField({
      name: "types",
      title: "Types",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "language",
      title: "Languages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "language" }] }],
    }),
  ],
});
