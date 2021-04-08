export interface IBlog {
  pkblog: number;
  title: string;
  summary: string;
  public_identifier: string;
  blog_tags: string[];
}

export interface BlogTag {
  tag: string;
}
export interface BlogTags {
  tags: BlogTag[];
}

export interface BlogCardProps {
  blog: IBlog;
}

export interface ElementDataProps {
  type: string;
  content: string;
}
