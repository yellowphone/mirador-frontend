import React from 'react';
import { BlogFeed } from './blog-feed/BlogFeed';

export const Blog = (): React.ReactElement => {
  return (
    <>
      <h1>Blogs</h1>
      <BlogFeed />
    </>
  );
};
