import React, { FC, useState } from 'react';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { SingleBlogDataProps } from './SingleBlog.types'
import { TagGrid } from '../../shared/media/Tags/TagGrid';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"


export const SingleBlog: FC<SingleBlogDataProps> = ({ data, html }) => {

    const [ leftArrowHover, setLeftArrowHover ] = useState(false);
    const [ rightArrowHover, setRightArrowHover ] = useState(false);

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
                    <TagGrid tags={data["findBlogById"]["blog_tags"]} />
                </Center>
                <Center>
                    <Text>lat: {data["findBlogById"]["blog_locations"]["lat"]}, lng: {data["findBlogById"]["blog_locations"]["lng"]}</Text>
                </Center>
                { html }
            </VStack>
        </Container> 
        <Container maxW="sm" centerContent>
            <SimpleGrid columns={2} spacing={10}>
                <Box 
                    onMouseEnter={() => { setLeftArrowHover(true) }}
                    onMouseLeave={() => { setLeftArrowHover(false) }}
                    d="flex" alignItems="center"
                >
                    <ChevronLeftIcon/>
                    { leftArrowHover && <Text>Previous blog</Text> }
                </Box>
                <Box 
                    onMouseEnter={() => { setRightArrowHover(true) }}
                    onMouseLeave={() => { setRightArrowHover(false) }}
                    d="flex" alignItems="center"
                >
                    { rightArrowHover && <Text >Next blog</Text>}
                    <ChevronRightIcon />
                </Box>
            </SimpleGrid>
        </Container>        
        </>
    )
}
