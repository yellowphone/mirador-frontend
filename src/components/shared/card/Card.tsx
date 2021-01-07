import { Box, Button, Container, Image, Spacer } from "@chakra-ui/react"
import React, { FC, useCallback } from "react"
import { Stars } from "../media/Stars/Stars";
import { CardDataProps } from "./Card.types";

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';

export const Card: FC<CardDataProps> = ({
    experience
}) => {

    const {
        fk_adventure_location,
        imageAlt,
        imageUrl,
        title,
        elevation,
        miles,
        rating,
    } = experience

    const history = useHistory();
    const onNavigate = useCallback((path: Paths) => {
        history.push(path, { pkadventure: fk_adventure_location });
    }, []);

    return (
        <Container onClick={() => onNavigate(Paths.SingleExperience)} maxW="20em" borderWidth="1px" borderRadius="lg" overflow="hidden">

            <Image src={imageUrl} alt={imageAlt} />

            <Box p="6">
            <Box d="flex" alignItems="baseline">

                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                >
                    {miles && miles.toFixed(2)} miles &bull; {elevation} feet
                </Box>
            </Box>
        
            <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
            >
                {title}
            </Box>

            <Box d="flex" mt="2" alignItems="center">
                <Stars rating={rating} />
                <Spacer />
                <Button colorScheme="teal" size="xs">
                    Save
                </Button>
            </Box>
            </Box>
        </Container>
    );
}