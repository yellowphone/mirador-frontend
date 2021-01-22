import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_BLOG } from '../../../graphql/mutations/blogMutation';
import { useHistory } from 'react-router-dom';
import { CreateBlog } from './CreateBlog';
import { Paths } from '../../../utils/paths';
import { Loader } from '@googlemaps/js-api-loader';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"

export const ConnectedCreateBlog = () => {

    const [createCoords, setCreateCoords] = useState({lat: 0, lng: 0});

    const [ createBlog, { data }] = useMutation(CREATE_BLOG);

    // JSON state object to store HTML metadata 
    const [ jsonContent, setJsonContent ] = useState<Object[]>([]);
    // HTML state object to display as blog is being created
    const [ html, setHtml ] = useState<Object[]>([]);

    const history = useHistory();

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    const onSubmit = (input: any) => {
        console.log(input)
        createBlog({
            variables: {
                title: input["title"],
                summary: input["summary"],
                content: {
                    content: jsonContent
                },
                pkuser: 1,
                lat: createCoords["lat"], 
                lng: createCoords["lng"]
            }
        }).then(data => {
            history.push(Paths.SingleBlog, { pkblog: data.data["createBlog"]["pkblog"] })
        })
    }

    const renderBlogComponents = (type: string, content: any) => {
        switch(type) {
            case 'image':
                return <Image src={content} />
            case 'text':
                return <Text>{content}</Text>
            case 'experience':
                return <Center><BlogExperienceCard pkexperience={parseInt(content)}/></Center>
        }
    }

    const addContent = (type: string, content: any) => {
        if (type == "experience") {
            setJsonContent(jsonContent => [...jsonContent, {type: type, content: parseInt(content)}])
        }
        else {
            setJsonContent(jsonContent => [...jsonContent, {type: type, content: content}])
        }
        setHtml(html => [...html, <SimpleGrid columns={1}>{renderBlogComponents(type, content)}</SimpleGrid>])
        console.log(jsonContent)
    }

    const addContentHelper = (input: any) => {
        console.log(input)
        if (input["type"] != "two_col") {
            addContent(input["type"], input["content"])
        }
    }

    return (
        <>
            <CreateBlog onSubmit={onSubmit} addContentHelper={addContentHelper} addContent={addContent} html={html} setCreateCoords={setCreateCoords} loader={loader}/>
        </>
    )

}