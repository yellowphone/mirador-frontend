import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { BlogFeed } from './blog-feed/BlogFeed';

export const Blog = (): React.ReactElement => {
  return (
    <>
      <NavigationBar />
      <h1>Blogs</h1>
      <BlogFeed />
    </>
  );
};
