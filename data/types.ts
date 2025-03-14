import { Image, Slug, TypedObject } from "sanity";

export interface Posts {
  slug: {
    current: string;
  };
  title: string;
}

export type TypeProject = {
  title: string;
  slug: Slug;
  publishedAt: string;
  websiteUrl: string;
  repoUrl: string;
  description: string;
  story: TypedObject[];
  mainImage: Image;
  video: TypeProjectVideo;
  authors: TypeAuthor[];
  types: TypeTypes[];
  language: TypeLanguage[];
  testimonial: TypeTestimonial[];
};

export type TypePaths = {
  slug: string;
  title: string;
};

export type TypeTypes = {
  title: string;
};

export type TypeAuthor = {
  name: string;
  websiteUrl: string;
};

export type TypeLanguage = {
  title: string;
  url: string;
};

export type TypeTestimonial = {
  author: string;
  role: string;
  quote: string;
};

export type TypeProjectVideo = {
  mp4Url: string;
  webmUrl: string;
};
