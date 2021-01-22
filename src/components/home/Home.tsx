import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Input, VStack, Center, Box, } from '@chakra-ui/react';
import './Home.css';

import { Search } from '../shared/Google/Search'

export const Home = () => {

    return (
        <>
            <NavigationBar />
            <VStack>
                <Box className='exploreBar' width='50%'>
                    <Center>Let's Explore</Center>
                    <Input placeholder={'Type a location to get started'} />
                    {/* <SearchWithMap /> */}
                </Box>
            </VStack>
        </>
    )
}