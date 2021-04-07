import React, { FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CreateBlogDataProps } from './CreateBlog.types'
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box, Textarea, Button, Input, Select } from "@chakra-ui/react"
import { ExperienceSearch } from '../../shared/search/ExperienceSearch';
import { Search } from '../../shared/Google/Search'
import { Upload } from '../../shared/upload/Upload';
import { SelectTag } from '../../shared/media/Tags/SelectTag';


export const CreateBlog: FC<CreateBlogDataProps> = ({ onSubmit, addElement, renderElements, setCreateCoords, loader, setAddedTags, addedTags }) => {

    const [ textButton, setTextButton ] = useState(false)
    const [ imageButton, setImageButton ] = useState(false)
    const [ experienceButton, setExperienceButton ] = useState(false)

    const textOnClick = () => { 
        setTextButton(true)
        setImageButton(false)
        setExperienceButton(false)
    }
    const imageOnClick = () => {
        setTextButton(false)
        setImageButton(true)
        setExperienceButton(false)
    }
    const experienceOnClick = () => {
        setTextButton(false)
        setImageButton(false)
        setExperienceButton(true)
    }

    const { register, handleSubmit, errors } = useForm();

    const submitElement = (input: any) => {
        console.log(input)
        addElement(input["type"], input["content"]);
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
                        <SelectTag setAddedTags={setAddedTags} addedTags={addedTags}/>
                        <Search loader={loader} setCoords={setCreateCoords} refetch={() => {}} />
                    </form>
                    <br></br>

                    <Container maxW="lg">
                        <VStack spacing='40px'>
                            { renderElements() }
                        </VStack>
                    </Container>     

                    <form onSubmit = { handleSubmit(submitElement) }>
                        <Center>
                            <Button onClick={textOnClick}>Add text</Button>
                            <Button onClick={imageOnClick}>Add image</Button>
                            <Button onClick={experienceOnClick}>Add experience</Button>
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
                                <Upload addContent={addElement} />
                            </> 
                        : null }

                        { experienceButton ? 
                            <>
                                <ExperienceSearch addContent={addElement}/>
                            </> 
                        : null }

                    </form>
                </Box>
            </Container>
            
        </>
    )
}
