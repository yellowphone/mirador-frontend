import React, { FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CreateBlogDataProps } from './CreateBlog.types'
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box, Textarea, Button, Input } from "@chakra-ui/react"
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';


export const CreateBlog: FC<CreateBlogDataProps> = ({ onSubmit, jsonContent, setJsonContent }) => {

    const [ html, setHtml ] = useState([]);

    const { register, handleSubmit, errors } = useForm();

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

    const testFunc = (input: any) => {
        console.log(input)
        addContent(input["title"], input["content"])
    }

    // var html: Object[] = []
    // jsonContent.map(elem => {
    //     console.log(elem);
    //     if (elem["type"] == "two_col") {
    //         html.push(
    //             <SimpleGrid columns={2} spacing={5}>
    //                 {renderBlogComponents(elem["col1"]["type"], elem["col1"]["content"])}
    //                 {renderBlogComponents(elem["col2"]["type"], elem["col2"]["content"])}
    //             </SimpleGrid>
    //         )
    //     }
    //     else {
    //         html.push(
    //             <SimpleGrid columns={1}>
    //                 {renderBlogComponents(elem["type"], elem["content"])}
    //             </SimpleGrid>
    //         )
            
    //     }
    // })

    return(
        <>
            <NavigationBar/>
            <Box maxW='100%'>
                <form onSubmit = { handleSubmit(onSubmit) }>
                    <Input name="title" placeholder="Title" ref={register} />
                    <Textarea name="summary" placeholder="Summary" ref={register} />
                    <Button type="submit">Create</Button>
                </form>

                <form onSubmit = { handleSubmit(testFunc) }>
                    <Input name="title" placeholder="Type" ref={register} />
                    <Input name="content" placeholder="Content" ref={register} />
                    <Button type="submit">Add</Button>
                </form>


                { html } 

                {/* <form onSubmit = { handleSubmit(onSubmit) } > */}
                    {/* { html }  */}
                    {/* <Input name="title" placeholder="Title" ref={register} />
                    <Textarea name="summary" placeholder="Summary" ref={register} /> */}
                    {/* <Textarea name="content" placeholder="Add HTML" ref={register} /> */}
                    {/* <Button type="submit">Create</Button> */}
                {/* </form> */}
            </Box>
        </>
    )
}
