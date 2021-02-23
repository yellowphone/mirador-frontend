import React, { FC } from "react"
import { ConnectedSingleBlogDataProps } from './SingleBlog.types'
import { useQuery, useLazyQuery } from '@apollo/client';
import { FIND_BLOG_BY_ID, FIND_RANDOM_BLOG } from '../../../graphql/queries/blogQuery';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard'
import { SingleBlog } from "./SingleBlog";

export const ConnectedSingleBlog: FC<ConnectedSingleBlogDataProps> = ({ history }) => {

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


    const renderBlogComponents = (type: string, content: any) => {
        switch(type) {
            case 'image':
                return <Image src={content} />
            case 'text':
                return <Text>{content}</Text>
            case 'experience':
                return <Center><BlogExperienceCard pkexperience={content}/></Center>
        }
    }

    console.log(data)

    var html: Object[] = []
    data["findBlogById"]["content"]["content"].map((elem: Object, index: number) => {
        console.log(elem);
        if (elem["type"] == "two_col") {
            html.push(
                <SimpleGrid key={index} columns={2} spacing={5}>
                    {renderBlogComponents(elem["col1"]["type"], elem["col1"]["content"])}
                    {renderBlogComponents(elem["col2"]["type"], elem["col2"]["content"])}
                </SimpleGrid>
            )
        }
        else {
            html.push(
                <SimpleGrid key={index} columns={1}>
                    {renderBlogComponents(elem["type"], elem["content"])}
                </SimpleGrid>
            )
            
        }
    })

    return(
        <SingleBlog data={data} html={html} />
    )

}