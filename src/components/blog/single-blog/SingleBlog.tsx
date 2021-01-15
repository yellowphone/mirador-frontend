import React, { FC } from 'react';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { SingleBlogDataProps } from './SingleBlog.types'

export const SingleBlog: FC<SingleBlogDataProps> = ({ data, html }) => {

    return(
        <>
        <NavigationBar/>
        <br></br>
        <Container maxW="lg">
            <VStack spacing='40px'>
                <Center>
                    <Heading>{data["findBlogById"]["title"]}</Heading>
                </Center>
                <Center>
                    <Text style={{ textAlign: "center" }} fontSize="md" as="em" color="gray.500">{data["findBlogById"]["summary"]}</Text>
                </Center>
                <Center>
                    <Text>lat: {data["findBlogById"]["blog_locations"]["lat"]}, lng: {data["findBlogById"]["blog_locations"]["lng"]}</Text>
                </Center>
                { html }

            </VStack>
        </Container>         
        </>
    )
}
