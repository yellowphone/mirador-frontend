import React, { useEffect } from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Input, VStack, Center, Box, } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import './Home.css';

import { Search } from '../shared/Google/Search'

export const Home = () => {

    const [cookies, setCookie] = useCookies(['name']);

    useEffect(() => {
        setCookie('name', "woo", { path: '/' });
    })

    return (
        <>
            <NavigationBar />
            <VStack>
                <Box className='exploreBar' width='50%'>
                    <Center>Let's Explore</Center>
                    <Input placeholder={'Type a location to get started'} />
                    {/* <SearchWithMap /> */}
                    {cookies.name && <h1>Hello {cookies.name}</h1>}
                </Box>
            </VStack>
        </>
    )
}