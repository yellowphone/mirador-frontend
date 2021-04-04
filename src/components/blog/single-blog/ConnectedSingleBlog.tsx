import React, { useState, useEffect } from "react"
import { useQuery } from '@apollo/client';
import { FIND_BLOG_BY_PUBLIC_IDENTIFIER} from '../../../graphql/queries/blogQuery';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard'
import { SingleBlog } from "./SingleBlog";
import { useLocation } from "react-router-dom";
import { Page404 } from "../../shared/404/404";
import { FIND_MONGODB_BLOG } from "../../../graphql/queries/mongodbQuery";
import { ElementDataProps } from '../Blog.types';
import { mongodbClient } from "../../../graphql/mongodbClient";

export const ConnectedSingleBlog = () => {

    const [ data, setData ] = useState<Object>({});
    const [ elements, setElements ] = useState<Object[]>([]);
    const [ mongoid, setMongoid ] = useState<String>("");

    const location = useLocation();

    const { data: blogData, loading, error, refetch } = useQuery(FIND_BLOG_BY_PUBLIC_IDENTIFIER, {
        variables: { public_identifier: location.pathname.split('/')[2] },
        onCompleted: (data) => {
            console.log(data)
            setData(data);
            setMongoid(data["findBlogByPublicIdentifier"]["mongoid"])
        },
        onError: (err) => console.error(err)
    })

    const { data: mongoData, loading: mongoLoading, error: mongoError } = useQuery(FIND_MONGODB_BLOG, {
        variables: { id: mongoid },
        client: mongodbClient,
        onCompleted: (data) => {
            console.log(data)
            setElements(data["findBlog"]["content"])
            console.log(elements)
        },
        onError: (err) => console.error(err)
    })

    const renderElements = () => {
        return elements.map((element: ElementDataProps, index: number) => {
            switch(element["type"]) {
                case "image":
                    return <SimpleGrid key={index} columns={1}><Image src={element["content"]} /></SimpleGrid>
                case "text":
                    return <SimpleGrid key={index} columns={1}><Text>{element["content"]}</Text></SimpleGrid>
                case "experience":
                    return <SimpleGrid key={index} columns={1}><Center><BlogExperienceCard public_identifier={element["content"]}/></Center></SimpleGrid>
            }
        })
    }

    return (
        <>
            { !data["findBlogByPublicIdentifier"] && <Page404/> }
            { data["findBlogByPublicIdentifier"] && <SingleBlog data={data} renderElements={renderElements} /> }
        </>
    )

}