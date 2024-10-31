export interface Posts {
  slug: {
    current: string;
  };
  title: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  story: string;
  img: string;
  link: string;
  tags: string[];
  date: string;
}