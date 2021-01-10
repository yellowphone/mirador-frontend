import { HStack } from '@chakra-ui/react';
import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { SingleBlog } from './single-blog/SingleBlog'

export const Blog = () => {

    return (
        <>
            <NavigationBar />
            <h1>Blogs</h1>
            <p>Here's a sample for a single blog</p>
            <br></br>
            <br></br>
        </>
    )
}