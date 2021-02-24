import { HStack } from '@chakra-ui/react';
import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { BlogCard } from './blog-card/BlogCard';
import { BlogFeed } from './blog-feed/BlogFeed';
import { SingleBlog } from './single-blog/SingleBlog'

export const Blog = () => {

    return (
        <>
            <NavigationBar />
            <h1>Blogs</h1>
            <BlogFeed />
        </>
    )
}