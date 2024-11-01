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
  projectIndex: number;
  publishedAt: string;
  description: string;
  story: TypedObject[];
  mainImage: Image;
  gallery: Image[];
  websiteUrl: string;
  authors: TypeAuthor[];
  types: TypeTypes[];
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

export type TypeTestimonial = {
  author: string;
  entity: string;
  testimonialFr: TypedObject[];
  testimonialEn: TypedObject[];
};
