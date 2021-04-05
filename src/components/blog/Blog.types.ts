import { TSFixMe } from '../../types/global';

export interface IBlog {
  pkblog: number;
  title: string;
  summary: string;
  public_identifier: string;
  blog_tags: TSFixMe[];
}

export interface BlogCardProps {
  blog: IBlog;
}
