import React, { FC } from 'react';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard'
import { useQuery } from '@apollo/client';
import { FIND_BLOG_BY_ID } from '../../../graphql/queries/blogQuery';

interface SingleBlogDataProps {
    history: History
}

export const SingleBlog: FC<SingleBlogDataProps> = ({ history }) => {

    const { data, loading, error, refetch } = useQuery(FIND_BLOG_BY_ID, {
        variables: { pkblog: history.location.state.pkblog }
    })

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    return(
        <>
        <NavigationBar/>
        <Container maxW="lg" dangerouslySetInnerHTML={{__html: data["findBlogById"]["content"]}}>
        </Container>            
        </>
    )
}
