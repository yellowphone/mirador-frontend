import React, { FC } from 'react';
import { useForm } from "react-hook-form";
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CreateBlogDataProps } from './CreateBlog.types'
import { Input, 
    Box,
    Textarea,
    Button
} from "@chakra-ui/react"

export const CreateBlog: FC<CreateBlogDataProps> = ({ onSubmit }) => {

    const { register, handleSubmit, errors } = useForm();

    return(
        <>
            <NavigationBar/>
            <Box maxW='100%'>
                <form onSubmit = { handleSubmit(onSubmit) } >
                    <Input name="title" placeholder="Title" ref={register} />
                    <Textarea name="summary" placeholder="Summary" ref={register} />
                    <Textarea name="content" placeholder="Add HTML" ref={register} />
                    <Button type="submit">Create</Button>
                </form>
            </Box>
        </>
    )
}
