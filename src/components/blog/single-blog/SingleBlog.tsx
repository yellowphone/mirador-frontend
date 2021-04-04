import React, { FC, useCallback, useState } from 'react';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { SingleBlogDataProps } from './SingleBlog.types'
import { TagGrid } from '../../shared/media/Tags/TagGrid';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';


export const SingleBlog: FC<SingleBlogDataProps> = ({ data, renderElements }) => {

    const history = useHistory();

    return(
        <>
        <NavigationBar/>
        <Container maxW="lg" p={2}>
            <VStack spacing='40px'>
                <Center>
                    <Heading>{data["findBlogByPublicIdentifier"]["title"]}</Heading>
                </Center>
                <Center>
                    <Text style={{ textAlign: "center" }} fontSize="md" as="em" color="gray.500">{data["findBlogByPublicIdentifier"]["summary"]}</Text>
                </Center>
                <Center>
                    <TagGrid tags={data["findBlogByPublicIdentifier"]["blog_tags"]} />
                </Center>
                <Center>
                    <Text>lat: {data["findBlogByPublicIdentifier"]["blog_locations"]["lat"]}, lng: {data["findBlogByPublicIdentifier"]["blog_locations"]["lng"]}</Text>
                </Center>
                { renderElements() }
            </VStack>
        </Container>     
        </>
    )
}
