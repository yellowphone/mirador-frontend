import React, { FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CreateBlogDataProps } from './CreateBlog.types'
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box, Textarea, Button, Input, Select } from "@chakra-ui/react"
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { ExperienceSearch } from '../../shared/search/experienceSearch';


export const CreateBlog: FC<CreateBlogDataProps> = ({ onSubmit, jsonContent, setJsonContent }) => {

    const [ html, setHtml ] = useState([]);

    const [ textButton, setTextButton ] = useState(false)
    const [ imageButton, setImageButton ] = useState(false)
    const [ experienceButton, setExperienceButton ] = useState(false)
    // const [ two_colButton, setTwo_colButton ] = useState(false)
    const textOnClick = () => { 
        setTextButton(true)
        setImageButton(false)
        setExperienceButton(false)
        // setTwo_colButton(false)
    }
    const imageOnClick = () => {
        setTextButton(false)
        setImageButton(true)
        setExperienceButton(false)
        // setTwo_colButton(false)
    }
    const experienceOnClick = () => {
        setTextButton(false)
        setImageButton(false)
        setExperienceButton(true)
        // setTwo_colButton(false)
    }
    // const two_colOnClick = () => {
    //     setTextButton(false)
    //     setImageButton(false)
    //     setExperienceButton(false)
    //     setTwo_colButton(true)
    // }

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
        if (input["type"] != "two_col") {
            addContent(input["type"], input["content"])
        }
        
    }

    return(
        <>
            <NavigationBar/>
            <Container maxW='xl'>
                <Box maxW='100%'>
                    <form onSubmit = { handleSubmit(onSubmit) }>
                        <Center>
                            <Button type="submit">Create</Button>
                        </Center>
                        <Input name="title" placeholder="Title" ref={register} />
                        <Textarea name="summary" placeholder="Summary" ref={register} />
                    </form>
                    <br></br>

                    <Container maxW="lg">
                        <VStack spacing='40px'>
                            { html }
                        </VStack>
                    </Container>     

                    <form onSubmit = { handleSubmit(testFunc) }>
                        <Center>
                            <Button onClick={textOnClick}>Add text</Button>
                            <Button onClick={imageOnClick}>Add image</Button>
                            <Button onClick={experienceOnClick}>Add experience</Button>
                            {/* <Button style={{ paddingBlock: "10px" }} onClick={two_colOnClick}>Add two col</Button> */}
                        </Center>
                        

                        { textButton ? 
                            <>
                                <Input style={{ visibility: "hidden"}} name="type" defaultValue="text" ref={register}/>
                                <Textarea name="content" placeholder="Type text here" ref={register}/>
                                <Center>
                                    <Button type="submit">Add</Button>
                                </Center>
                            </> 
                        : null }

                        { imageButton ? 
                            <>
                                <Input style={{ visibility: "hidden"}} name="type" defaultValue="image" ref={register}/>
                                <Input name="content" placeholder="Put image url here" ref={register}/>
                                <Center>
                                    <Button type="submit">Add</Button>
                                </Center>
                            </> 
                        : null }

                        { experienceButton ? 
                            <>
                                <ExperienceSearch addContent={addContent}/>
                            </> 
                        : null }

                        {/* { two_colButton ? 
                            <>
                                <Input style={{ visibility: "hidden"}} name="type" defaultValue="two_col" ref={register}/>
                                <SimpleGrid columns={2} spacing={3}>

                                </SimpleGrid>
                                <Input name="content" placeholder="Put pkexperience here" ref={register}/>
                                <Center>
                                    <Button type="submit">Add</Button>
                                </Center>
                            </> 
                        : null } */}

                    </form>
                </Box>
            </Container>
            
        </>
    )
}
