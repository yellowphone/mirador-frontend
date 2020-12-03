import { Center, Container, Divider, Box, SimpleGrid, Text, HStack } from '@chakra-ui/react';
import React from 'react';

export const ActionBar = () => {

    return (
        <>
            <Container>
                <HStack>
                    <Box>
                        <Center>
                            <Text>Overview</Text>
                        </Center>
                    </Box>
                    <Divider orientation='vertical' />
                    <Box>
                        Adventures
                    </Box>
                    <Divider orientation='vertical' />
                    <Box>
                        Blogs
                    </Box>
                    <Divider orientation='vertical' />
                    <Box>
                        Itineraries
                    </Box>
                </HStack>
            </Container>
        </>
    );
};