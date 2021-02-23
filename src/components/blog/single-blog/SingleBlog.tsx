import React, { FC, useCallback, useState } from 'react';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { SingleBlogDataProps } from './SingleBlog.types'
import { TagGrid } from '../../shared/media/Tags/TagGrid';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useLazyQuery } from '@apollo/client';
import { FIND_RANDOM_BLOG } from '../../../graphql/queries/blogQuery';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';


export const SingleBlog: FC<SingleBlogDataProps> = ({ data, html }) => {

    const [ leftArrowHover, setLeftArrowHover ] = useState(false);
    const [ rightArrowHover, setRightArrowHover ] = useState(false);

    const [ findRandomBlog, { data: randomBlog }] = useLazyQuery(FIND_RANDOM_BLOG, {
        variables: {
            previousPrimaryKey: data["findBlogById"]["pkblog"]
        },
        fetchPolicy: "no-cache"
    });

    const history = useHistory();
    const onNavigate = useCallback((path: Paths, pkblog: number) => {
        history.push(path, { pkblog: pkblog });
    }, []);

    return(
        <>
        <NavigationBar/>
        <Container maxW="lg" p={2}>
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
        <br></br>
        <Container maxW="sm" centerContent p={5}>
            <SimpleGrid columns={2} spacing={10}>
                <Box 
                    onMouseEnter={() => { setLeftArrowHover(true) }}
                    onMouseLeave={() => { setLeftArrowHover(false) }}
                    onClick={() => {
                        findRandomBlog()
                        if (randomBlog) {
                            console.log(randomBlog["findRandomBlog"][0]["pkblog"])
                            onNavigate(Paths.SingleBlog, randomBlog["findRandomBlog"][0]["pkblog"])
                        }
                    }}
                    d="flex" alignItems="center"
                >
                    <ChevronLeftIcon/>
                    { leftArrowHover && <Text>Previous blog</Text> }
                </Box>
                <Box 
                    onMouseEnter={() => { setRightArrowHover(true) }}
                    onMouseLeave={() => { setRightArrowHover(false) }}
                    onClick={() => {
                        findRandomBlog()
                        if (randomBlog) {
                            console.log(randomBlog["findRandomBlog"][0]["pkblog"])
                            onNavigate(Paths.SingleBlog, randomBlog["findRandomBlog"][0]["pkblog"])
                        }
                    }}
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
