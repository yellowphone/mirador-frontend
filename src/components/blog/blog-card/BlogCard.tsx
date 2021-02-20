import React, { useCallback, FC } from "react"
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import { Box, Button, Container, Image, Spacer, Heading } from "@chakra-ui/react"
import { BlogCardProps } from "../Blog.types";
import { TagGrid } from "../../shared/media/Tags/TagGrid";

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {

    const {
        pkblog,
        title,
        summary,
        blog_tags
    } = blog

    const history = useHistory();
    const onNavigate = useCallback((path: Paths) => {
        history.push(path, { pkblog: pkblog });
    }, []);


    return (
        <Box onClick={() => onNavigate(Paths.SingleBlog)} w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image p={2} src="https://live.staticflickr.com/1792/43126473995_13dc955fbf_z.jpg" />
            <Heading p={2}>{title}</Heading>
            <TagGrid tags={blog_tags} />
        </Box>
    )
}