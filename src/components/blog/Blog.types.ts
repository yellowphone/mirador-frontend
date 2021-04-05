export interface IBlog {
  pkblog: number;
  title: string;
  summary: string;
  public_identifier: string;
  blog_tags: string[];
}

export interface BlogCardProps {
  blog: IBlog;
}
