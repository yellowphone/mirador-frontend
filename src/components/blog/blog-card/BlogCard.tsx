import React, { useCallback } from "react"
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import { Box, Button, Container, Image, Spacer, Heading } from "@chakra-ui/react"

export const BlogCard = ({ blog }) => {

    const {
        pkblog,
        title,
        summary
    } = blog

    const history = useHistory();
    const onNavigate = useCallback((path: Paths) => {
        history.push(path, { pkblog: pkblog });
    }, []);


    return (
        <Container onClick={() => onNavigate(Paths.SingleBlog)} maxW="20em" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src="https://live.staticflickr.com/1792/43126473995_13dc955fbf_z.jpg" />
            <Heading>{title}</Heading>
        </Container>
    )
}